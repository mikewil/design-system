import * as Figma from 'figma-js'
import { parseArgs } from 'node:util'
import fs from 'fs'
import axios from 'axios'

const DESIGN_SYSTEM_FIGMA_CONTSTANTS = {
  DesignSystemDesignSystemFileId: 'MkgpIgyPyIYr0oodbPa4cf',
  IconsCanvasNodeId: '13052:33644',
}

const {
  values: { token, help, outputFolder },
} = parseArgs({
  options: {
    token: {
      type: 'string',
    },
    outputFolder: {
      type: 'string',
    },
    help: {
      type: 'boolean',
      default: false,
    },
  },
  strict: true,
})

if (help || !token || !outputFolder) {
  console.log(
    'Usage: icon-synchronizer --token <figma-token> --outputFolder <output-folder>',
  )
  console.log(
    ' --token <figma-token>  Figma token. Log into Figma and generate a personal access token with read rights.',
  )
  console.log(
    ' --outputFolder <output-folder>  Output folder for the generated icons',
  )
  process.exit(0)
}

const client = Figma.Client({ personalAccessToken: token })
axios.defaults.headers.common['X-Figma-Token'] = token

// Get all icons from the Icons canvas
const fileResponse = await client.file(
  DESIGN_SYSTEM_FIGMA_CONTSTANTS.DesignSystemDesignSystemFileId,
  { ids: [DESIGN_SYSTEM_FIGMA_CONTSTANTS.IconsCanvasNodeId] },
)
const components = fileResponse.data.components
const componentIds = Object.keys(fileResponse.data.components)

// Get all SVGs from the icons
const fileImagesResponse = await client.fileImages(
  DESIGN_SYSTEM_FIGMA_CONTSTANTS.DesignSystemDesignSystemFileId,
  {
    ids: componentIds,
    format: 'svg',
  },
)

await Promise.all(
  Object.entries(fileImagesResponse.data.images).map(async ([id, url]) => {
    components[id].svg = (await axios.get(url)).data
    // Remove the fill attribute from the SVGs
    components[id].svg = components[id].svg.replace(
      /fill="[^"]*"/g,
      'fill="currentColor"',
    )
  }),
)

// Generate the icon files
const template = (iconName, svg) => `
import { Icon, IconPropsWithoutChildren } from '../Icon'

export function ${iconName}(props: IconPropsWithoutChildren) {
    return (
        <Icon {...props}>
            ${svg}
        </Icon>
    )
}
`

const generatedIconsFolder = `${outputFolder}/generated-icons`
if (!fs.existsSync(generatedIconsFolder))
  fs.mkdirSync(generatedIconsFolder, { recursive: true })

let indexFileContents = ''
const iconNamingConvention = /^(?<namespace>[a-zA-Z0-9_\s\+]+) \/ (?<name>.*)$/
Object.entries(components).forEach(([_, icon]) => {
  const match = iconNamingConvention.exec(icon.name)
  if (!match) {
    console.error(`Icon name ${icon.name} does not match the naming convention`)
    return
  }
  let { namespace, name } = match.groups

  // Replace + with 'And' in the icon name and namespace name
  namespace = namespace.replace(/\+/g, 'And')
  name = name.replace(/\+/g, 'And')

  // PascalCase the icon name
  name = name.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase()
  })

  // Replace - in the name with _
  name = name.replace(/-/g, '_')

  // Replace ' ' in the namespace and name with ''
  namespace = namespace.replace(/ /g, '')
  name = name.replace(/ /g, '')

  // Replace ',' in the name with 'Or'
  name = name.replace(/,/g, 'Or')

  const iconName = `${namespace}_${name}`
  indexFileContents += `export { ${iconName} } from './generated-icons/${iconName}'\n`
  const code = template(iconName, icon.svg)
  fs.writeFileSync(`${generatedIconsFolder}/${iconName}.tsx`, code)
})

fs.writeFileSync(`${outputFolder}/index.ts`, indexFileContents)
