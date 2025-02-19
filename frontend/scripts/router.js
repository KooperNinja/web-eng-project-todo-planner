
/**
 * Navigates the user to a subpath of the url. \
 * Works with either the directory like "/dashboard" if it contains an index.html or with the whole path "/path/other.html"
 * @param {string} path 
 */
export const navigate = path => {
    if (!path.endsWith('.html')) {
        const beforeSlash = path.endsWith("/") ? "" : "/"
        path += `${beforeSlash}index.html`
    }
    if(window.location.pathname == path) {
        console.log("Already on that path")
        return
    }
    window.location.pathname = path
}