import { useState } from 'react';
import React from "react";
import '../css/Table.css'
import UpdateOverlay from "./UpdateOverlay";

const Table = ({ headers, data }) => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handlePopupToggle = (row) => {
        setSelectedRow(row);
        setOverlayVisible(true);
    };

    //TODO: add a popup and corresponding logic to update or delete a row 
    return (
        <>
            <table>
                <thead>
                    <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                        {headers.map((header, colIndex) => (
                            <td key={colIndex}>{row[header.toLowerCase()] || "-"}</td>
                        ))}
                        
                        <td><a href="#" onClick={() => handlePopupToggle(row)}>U</a> <a>D</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isOverlayVisible && <UpdateOverlay selectedRow={selectedRow}/>}
        </>
    );
};

export default Table;
