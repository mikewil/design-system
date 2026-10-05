import { readdirSync, statSync, readFileSync } from 'fs'
import { join } from 'path'
import { Client } from 'figma-js'

// Get Passed in command line arguments
const args = process.argv.slice(2)
var FIGMA_TOKEN = args[0]
var DESIGN_KEY = args[1]

// This checks if a developer has accidentally committed the wrong Figma node Id
const folderPath = './packages/design-system-react/figma'

// To run locally, swap the process.env.FIGMA_TOKEN with your personal access token from FIGMA
const client = Client({
    personalAccessToken: FIGMA_TOKEN,
})

// Function to fetch all components from the Figma design system
async function fetchFigmaComponents() {
    try {
        const { data } = await client.file(DESIGN_KEY)

        const pages = data.document.children

        const mobilePage = pages.find(
            (page) =>
                page.name.includes('Mobile') && !page.name.includes('Web'),
        )

        if (!mobilePage) {
            console.log('Mobile page not found.')
            return []
        }

        const components = []

        mobilePage.children.forEach((component) => {
            component.children.forEach((child) => {
                const formatId = child.id.replace(':', '-')
                console.log(
                    `Component: ${child.name} Component ID: ${formatId}`,
                )
                components.push(formatId)
            })
        })

        return components // Return the array of component IDs
    } catch (error) {
        console.error('Error fetching components:', error)
        return []
    }
}

// Function to recursively scan files in a folder
function scanFolder(dir, searchStrings) {
    const files = readdirSync(dir)

    let found = false

    files.forEach((file) => {
        const filePath = join(dir, file)
        const stat = statSync(filePath)

        if (stat.isDirectory()) {
            // Recursively scan subfolders
            scanFolder(filePath, searchStrings)
        } else {
            const content = readFileSync(filePath, 'utf8')

            // Check each string in the searchStrings array
            searchStrings.forEach((searchString) => {
                if (content.includes(searchString)) {
                    console.log(`Found '${searchString}' in file: ${filePath}`)
                    found = true
                }
            })
        }
    })

    if (found) {
        console.log(
            `Error: One or more of the search strings found in the files.`,
        )
        process.exit(1)
    } else {
        console.log('No occurrences of any of the search strings found.')
    }
}

async function main() {
    console.log('Fetching Mobile Page Figma components...')
    const searchStrings = await fetchFigmaComponents()

    if (searchStrings.length === 0) {
        console.error('No search strings found, exiting.')
        process.exit(1)
    } else {
        console.log('Starting folder scan...')
        scanFolder(folderPath, searchStrings)
    }
}

main()
