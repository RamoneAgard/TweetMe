import React from "react"
import numeral from 'numeral'

//function to display user read numbers with numeral JS
export function DisplayCount(props) {
    return <span className={props.className}>{numeral(props.children).format('0a')}</span>
}