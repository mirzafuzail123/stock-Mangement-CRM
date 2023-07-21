import React from 'react'
import { useState } from 'react'
import GlobalStateContext from './GlobalStateContext'

export default function GlobalStateContextProvider(props) {
    const [SearchValue, setSearchValue] = useState()
    const [dummyState, setdummyState] = useState(false)
    const [SelectedStore, setSelectedStore] = useState(null)

    const [ParentLoading, setParentLoading] = useState(false)

    const [SaleType, setSaleType] = useState(null)
    const [ReturnType, setReturnType] = useState(null)

    // Calculate No of pages
    const CalculatePagination = (totalEntries, gap) => {
        const pageOptionList = []
        let toRecord = 0
        for (let fromRecord = 0; fromRecord < totalEntries;) {
            toRecord = toRecord + gap

            if (toRecord <= totalEntries) {
                pageOptionList.push({ 'fromRecord': fromRecord, "toRecord": toRecord })
            }
            else {
                pageOptionList.push({ 'fromRecord': fromRecord, "toRecord": totalEntries })
            }
            fromRecord = fromRecord + gap
        }
        return pageOptionList
    }


    // Convert Date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    // Add M or k to large digits
    function formatNumber(value) {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(value % 1000 !== 0 ? 1 : 0) + 'k';
        }

        return value.toString();
    }

    // Copy Clipboard
    function copyToClipboard(text) {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = text;

        // Append the textarea to the document
        document.body.appendChild(textarea);

        // Select the text within the textarea
        textarea.select();

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Remove the textarea from the document
        document.body.removeChild(textarea);
    }


    // Function to change the key of each object
    function changeKeyOfObjects(list, oldKey, newKey) {
        return list.map(obj => {
            if (obj.hasOwnProperty(oldKey)) {
                obj[newKey] = obj[oldKey];
                delete obj[oldKey];
            }
            return obj;
        });
    }



    return (
        <GlobalStateContext.Provider value={{
            CalculatePagination, SearchValue, setSearchValue, dummyState, setdummyState,
            SelectedStore, setSelectedStore, formatDate, formatNumber, SaleType, setSaleType,
            ReturnType, setReturnType, copyToClipboard, changeKeyOfObjects, ParentLoading, setParentLoading
        }}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}
