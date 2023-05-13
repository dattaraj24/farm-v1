import {useContext} from "react"
import { ContextPrice } from "../App";


const SEO = ( {title} ) => {    
    const price = useContext(ContextPrice);
    return (
        <>
            <meta charSet="utf-8" />
            <title>Milkshake Shake ${parseFloat(price).toFixed(3)} | {title}</title>
            <meta name="robots" content="noindex, follow" />
            <meta name="description" content="Creative Agency, Corporate and Portfolio React JS Template" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </>
    )
}

export default SEO;