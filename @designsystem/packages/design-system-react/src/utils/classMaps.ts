/**
 * Returns the class name for a given key from a styles object.
 * If the key does not exist in the styles object, it returns the key itself.
 *
 * @param {Object} styles - The styles imported into the component from the *.module.css file.
 * @param {string} styleSelector - The CSS style selector key (without the . in front)
 * @returns {string} The CSS class corresponding to the key, or the key itself if it does not exist in the styles object.
 */
export const getClass = (
  styles: { [key: string]: string },
  styleSelector: string,
): string => {
  const classMap: { [key: string]: string } = {
    ...styles,
    '': '',
  }
  return classMap[styleSelector] || styleSelector
}
