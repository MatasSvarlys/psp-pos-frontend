export default function UpdateOverlay(selectedRow){
    if (!selectedRow) {
        return <div>No row selected</div>; // Handle case where selectedRow is null
    }
    var row = JSON.stringify(selectedRow, null, 2);
    return(
        
        <div className="overlay">
            <h3>Update Row</h3>
            <div>
                {Object.entries(selectedRow.selectedRow).map(([key, value]) => (
                    <p key={key}>
                        <strong>{key}:</strong> {JSON.stringify(value)}
                    </p>
                ))}
            </div>
            <button>Close</button>
        </div>
    );
}