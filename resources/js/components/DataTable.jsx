import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DataTableActions from "@/components/DataTableActions";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip component
import PetProfileCard from "@/components/PetProfileCard"; // Import PetProfileCard component
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Margin } from "@mui/icons-material";
import MultipleSelect from "@/components/MultipleSelect";

const defaultTheme = createTheme();
const theme = createTheme({
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "2em",
                    color: "yellow",
                    backgroundColor: "red",
                },
            },
        },
    },
});
const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip
        {...props}
        componentsProps={{ tooltip: { className: className } }}
    />
))(`
    color: black;
    background-color: white;
   
`);
export default function DataTable({
    tableData,
    fields,
    mainfields,
    options,
    headerButton,
    title,
    viewlink,
    enableFilter,
}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [columns, setColumns] = React.useState([]);
    const [columnsMain, setColumnsMain] = React.useState([]);
    const [genderOptions, setGenderOptions] = useState([]);
    const [filters, setFilters] = useState({});
    const [vendorFilter, setVendorFilter] = useState("all");
    const [Vaccines, setVaccines] = useState([]);
    const [selectedVaccines, setSelectedVaccines] = useState([]);
    const [selectedVaccineIds, setSelectedVaccineIds] = useState([]);
  
   
    useEffect(() => {
        fetch("/api/allVaccines")
            .then((response) => response.json())
            .then((data) => {
                 // Log the fetched data
                const options = data.map((vaccine) => ({
                    label: vaccine.vaccine_name,
                    value: vaccine.id,
                }));

                // Log the transformed options
               

                setVaccines(options);

                // Check if user.vaccines is defined and not null
                if (user.vaccines) {
                    const initialSelectedVaccineIds = user.vaccines.map(
                        (vaccine) => vaccine.id
                    );

                    setSelectedVaccineIds(initialSelectedVaccineIds);
                    setSelectedVaccines(initialSelectedVaccineIds);

                    setData("vaccine_ids", initialSelectedVaccineIds);
                } else {
                    console.log("User vaccines are null or undefined.");
                }
            })
            .catch((error) => {
                console.error("Error fetching vaccines:", error);
            });
    }, []);

    // Now, you can access the updated state values here

    const handleVaccineChange = (selectedVaccines) => {
        setSelectedVaccineIds(selectedVaccines);
        setData("vaccine_ids", selectedVaccines);
        // Update vaccine IDs in your form data
        // For example: setData("vaccine_ids", selectedVaccines);
    };

    useEffect(() => {
        // Fetch gender options from your API endpoint
        fetch("/api/petsGender")
            .then((response) => response.json())
            .then((data) => {
                const options = Object.entries(data).map(([key, value]) => ({
                    value: key,
                    label: value,
                }));
                setGenderOptions(options);
            })
            .catch((error) => {
                console.error("Error fetching petgender:", error);
            });
    }, []);

    React.useEffect(() => {
        if (fields.length > 0) {
            const formattedColumns = fields.map((field) => ({
                id: field,
                label: field.charAt(0).toUpperCase() + field.slice(1),
                minWidth: 170,
                align: "left",
                style: { marginLeft: "20px" },
            }));
            setColumns(formattedColumns);
        }
    }, [fields]);

    React.useEffect(() => {
        if (mainfields.length > 0) {
            const formattedColumnsMain = mainfields.map((mainfield) => ({
                id: mainfield,
                label: mainfield.charAt(0).toUpperCase() + mainfield.slice(1),
                minWidth: 170,
                align: "left",
            }));
            setColumnsMain(formattedColumnsMain);
        }
    }, [mainfields]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    

    const handleFilterChange = (event, columnId) => {
        const { value } = event.target;
        setFilters((filters) => ({
            ...filters,
            [columnId]: value,
        }));
    };
    const handleVendorFilterChange = (event) => {
        const selectedFilter = event.target.value;

        setVendorFilter(selectedFilter);
    };

    const getFilteredData = () => {
        let filteredData = [...tableData];
    
        const filterValue = Object.values(filters).join('').toLowerCase();
    
        if (filterValue) {
            filteredData = filteredData.filter(row =>
                Object.values(row).some(value =>
                    String(value).toLowerCase().includes(filterValue)
                )
            );
        }
        
        filteredData = filteredData.filter(row => {
            // Check if the selected vaccine IDs are present in the row's vaccineIds
            // Assuming the vaccine IDs are stored in the field named 'vaccineIds' in each row
            if (selectedVaccineIds.length === 0) {
                // If no vaccine is selected, return true for all rows
                return true;
            } else {

                
                return selectedVaccineIds.every(selectedVaccineId =>
                    row['vaccineIds'].includes(selectedVaccineId)
                );
            }
        });
    
        filteredData = filteredData.filter(row => {
            if (vendorFilter === "all") {
                // Return true for all vendors
                return true;
            } else if (vendorFilter === "premium") {
                // Return true only for premium vendors
                return row["is_premium"] === 1;
            }
            return false;
        });
    
        return filteredData;
    };
    

    // Filtering logic based on the selected vendor filter

    // Filter premium vendors based on the selected filter and original tableData

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                }}
                class="mt-5"
            >
                <h2 class="text-4xl ms-4">{title}</h2>
                {enableFilter && (
                 <div class="flex gap-2">
                      <div style={{width:'400px'}}>
                            <MultipleSelect
                                options={Vaccines} // Pass your vaccine options here
                                label="Select Available Vaccines"
                                selectedValues={selectedVaccineIds}
                                setSelectedValues={handleVaccineChange}
                                
                            />
                        </div>
                    <div className="me-4">
                        <select
                            value={vendorFilter}
                            onChange={handleVendorFilterChange}
                        >
                            <option value="all">All Vendors</option>
                            <option value="premium">Premium Vendors</option>
                        </select>
                        </div>
                      
                        
                    </div>
                )}

                {headerButton && (
                    <div class="me-4">
                        <PrimaryButton link={headerButton}>Add</PrimaryButton>
                    </div>
                )}
            </div>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {enableFilter &&
                                    column.label !== "Action" ? ( // Conditionally render filter input
                                        <input
                                            type="text"
                                            placeholder={`Search ${column.label}`}
                                            value={filters[column.id] || ""}
                                            onChange={(event) =>
                                                handleFilterChange(
                                                    event,
                                                    column.id
                                                )
                                            }
                                            style={{ width: "100%" }}
                                        />
                                    ) : (
                                        column.label // Just render column label if enableFilter is false
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getFilteredData()
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index}
                                >
                                    {columnsMain.map((columnMain) => (
                                        <TableCell
                                            key={columnMain.id}
                                            align={columnMain.align}
                                        >
                                            {/* Render different formats based on the column id */}
                                            {columnMain.id === "pet_name" && (
                                                <CustomTooltip
                                                    title={
                                                        <PetProfileCard
                                                            petName={
                                                                row["pet_name"]
                                                            }
                                                            petType={
                                                                row["type_id"]
                                                            }
                                                            petGender={
                                                                row["gender"]
                                                            }
                                                            petBreed={
                                                                row["breed"]
                                                            }
                                                            parentName={
                                                                row["owner_id"]
                                                            }
                                                            contact={
                                                                row[
                                                                    "pet_contact"
                                                                ]
                                                            }
                                                            email={
                                                                row["pet_email"]
                                                            }
                                                            petAge={row["age"]}
                                                        />
                                                    }
                                                    arrow
                                                >
                                                    <div className="flex gap-4">
                                                        {/* Use a conditional statement to choose the image based on the pet type */}
                                                        {row["type_id"] == 1 ||
                                                        row["type_id"] == 2 ? (
                                                            <img
                                                                src={
                                                                    row[
                                                                        "type_id"
                                                                    ] === 1
                                                                        ? "/dogtable.png"
                                                                        : "/cattable.png"
                                                                }
                                                                alt=""
                                                                height={50}
                                                                width={50}
                                                                className="border border-gray-900 rounded-full"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={
                                                                    row[
                                                                        "avatar"
                                                                    ]
                                                                }
                                                                alt=""
                                                                height={50}
                                                                width={50}
                                                                className="border border-gray-900 rounded-full"
                                                            />
                                                        )}

                                                        <div className="flex flex-col">
                                                            <div className="flex flex-row gap-1">
                                                                <h4>
                                                                    {
                                                                        row[
                                                                            "pet_name"
                                                                        ]
                                                                    }
                                                                </h4>
                                                                {row[
                                                                    "is_private"
                                                                ] === 1 ||
                                                                row[
                                                                    "is_premium"
                                                                ] === 1 ? (
                                                                    <svg
                                                                        class="w-4 h-4 text-gray-800"
                                                                        aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="#f88080"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path
                                                                            fill="#f88080"
                                                                            d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                                                                        />
                                                                        <path
                                                                            fill="#fff"
                                                                            d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                                                                        />
                                                                    </svg>
                                                                ) : null}
                                                            </div>
                                                            {/* Display the breed name instead of "New Delhi" */}
                                                            <em>
                                                                {row["breed"]}
                                                            </em>
                                                        </div>
                                                    </div>
                                                </CustomTooltip>
                                            )}
                                            {columnMain.id ===
                                                "pet_location" && (
                                                <div className="flex flex-col">
                                                    <h4>
                                                        {row["pet_country"]}
                                                    </h4>
                                                    {/* Display the breed name instead of "New Delhi" */}
                                                    <em>
                                                        {row["pet_city"]},
                                                        {row["pet_state"]}
                                                    </em>
                                                </div>
                                            )}
                                            {/* Render other fields normally */}
                                            {columnMain.id === "gender" && (
                                                <div>
                                                    {
                                                        genderOptions.find(
                                                            (option) =>
                                                                option.value ===
                                                                row[
                                                                    columnMain
                                                                        .id
                                                                ]
                                                        )?.label
                                                    }
                                                </div>
                                            )}
                                            {columnMain.id ===
                                                "pet_type_id" && (
                                                <img
                                                    src={
                                                        row["pet_type_id"] === 1
                                                            ? "/dogtable.png"
                                                            : "/cattable.png"
                                                    }
                                                    alt=""
                                                    height={50}
                                                    width={50}
                                                    className="border border-gray-900 rounded-full"
                                                />
                                            )}
                                            {/* Render action buttons if the column is 'Action' */}
                                            {columnMain.id === "Action" && (
                                                <DataTableActions
                                                    options={options}
                                                    viewlink={
                                                        row["is_private"] === 1
                                                            ? ""
                                                            : viewlink +
                                                              (row["id"]
                                                                  ? row["id"]
                                                                  : "")
                                                    }
                                                />
                                            )}
                                            {columnMain.id !== "pet_name" &&
                                                columnMain.id !==
                                                    "pet_location" &&
                                                columnMain.id !== "gender" &&
                                                columnMain.id !==
                                                    "pet_type_id" &&
                                                row[columnMain.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={getFilteredData().length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
