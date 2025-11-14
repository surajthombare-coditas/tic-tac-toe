import { useState, useEffect, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import '../styles/GameHistory.css'

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule])

const GameHistory = ({ onBack }) => {
  const [gameHistory, setGameHistory] = useState([])
  const gridRef = useRef(null)

  useEffect(() => {
    // Load game history from localStorage
    const savedHistory = localStorage.getItem('ticTacToeHistory')
    if (savedHistory) {
        try {
            const parsed = JSON.parse(savedHistory)
            setGameHistory(parsed)
            console.log('Loaded game history:', parsed)
        } catch (error) {
            console.error('Error parsing game history:', error)
            setGameHistory([])
        }
    } else {
      console.log('No saved history found')
    }
  }, [])

  const columnDefs = useMemo(() => [
    {
      field: 'gameNumber',
      headerName: 'Game #',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 120,
      sortable: true,
      filter: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'date',
      headerName: 'Date & Time',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        if (!params.value) return ''
        const date = new Date(params.value)
        return date.toLocaleString()
      }
    },
    {
      field: 'winner',
      headerName: 'Winner',
      sortable: true,
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['apply', 'clear'],
        filterOptions: ['equals'],
        defaultOption: 'equals'
      },
      cellStyle: { textAlign: 'center', fontWeight: 'bold' },
      cellRenderer: (params) => {
        if (!params.value) {
          return <span style={{ color: '#888' }}>Draw</span>
        }
        return params.value === 'X' 
          ? <span style={{ color: '#ff4757' }}>Player 1 (X)</span>
          : <span style={{ color: '#3742fa' }}>Player 2 (O)</span>
      },
      valueGetter: (params) => {
        // Return formatted value for filtering and sorting
        if (!params.data?.winner) return 'Draw'
        return params.data.winner === 'X' ? 'Player 1 (X)' : 'Player 2 (O)'
      }
    },
  ], [])

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true
  }), [])

  const paginationPageSize = 5

  // Function to get selected row IDs and console log them
  const getSelectedRowIds = () => {
    if (!gridRef.current?.api) {
      console.log('Grid API not available')
      return
    }

    const selectedRows = gridRef.current.api.getSelectedRows()
    const selectedIds = selectedRows.map(row => row.gameNumber)
    
    console.log('Selected Row IDs:', selectedIds)
    console.log('Selected Rows:', selectedRows)
    
    return selectedIds
  }

  // Handle selection change
  const onSelectionChanged = (event) => {
    console.log('Selection changed event:', event)
    getSelectedRowIds()
  }
  
  // Handle cell clicked (for debugging)
  const onCellClicked = (event) => {
    console.log('Cell clicked:', event)
  }

  // Get row ID function for AG Grid
  const getRowId = (params) => {
    return params.data.gameNumber.toString()
  }

  return (
    <div className="game-history-container">
      <div className="history-header">
        <h2>Game History</h2>
        <button className="icon-button back" onClick={onBack} type="button" title="Back to Game">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      </div>
      
      {gameHistory.length === 0 ? (
        <div className="no-history">
          <p>No game history yet. Play some games to see your history here!</p>
        </div>
      ) : (
        <div className="ag-theme-alpine history-table">
          <AgGridReact
            ref={gridRef}
            rowData={gameHistory}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={false}
            domLayout="normal"
            animateRows={true}
            rowSelection="multiple"
            // rowSelection={{ mode: 'multipleRows' }}
            // suppressRowClickSelection={true}
            suppressRowClickSelection={true}
            getRowId={getRowId}
            theme="legacy"
            onGridReady={(params) => {
              console.log('Grid ready with data:', gameHistory.length, 'rows')
              console.log('Grid API:', params.api)
              params.api.sizeColumnsToFit()
            }}
            onSelectionChanged={onSelectionChanged}     
            // onCellClicked={onCellClicked}
          />
        </div>
      )}
    </div>
  )
}

export default GameHistory

