import React, { useEffect, useState } from "react";
import { IconButton, Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";

interface ShareInfo {
  sharedTo: { name: string; email: string };
  sharedBy: { name: string; email: string };
  sharedOn: Date;
  sharedFor: string;
  status: "EXPIRED" | "REVOKED" | "ACTIVE";
  actions: boolean; // true for enabled, false for disabled
}

type StatusType = "EXPIRED" | "REVOKED" | "ACTIVE";

export default function MadalView() {
  const [data, setData] = useState<ShareInfo[]>([]); // Initialize state to an empty array
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Fetch data from the public folder
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/challenge4.sample.json")
      .then((response) => response.json())
      .then((jsonData) => {
        jsonData = jsonData.map(
          (item: { sharedOn: string | number | Date }) => ({
            ...item,
            sharedOn: new Date(item.sharedOn),
          })
        );

        setData(jsonData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []); // Empty dependency array means this effect runs once on mount

  // Render status button
  const renderStatusButton = (status: StatusType) => {
    let backgroundColor: string = "";
    let textColor: string = "white"; // change this as needed

    switch (status) {
      case "ACTIVE":
        backgroundColor = "#0A0";
        break;
      case "EXPIRED":
        backgroundColor = "rgb(29, 138, 226)";
        break;
      case "REVOKED":
        backgroundColor = "red";
        break;
    }

    return (
      <Button
        variant="contained"
        style={{
          width: "100px",
          height: "25px",
          borderRadius: "25px",
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        {status}
      </Button>
    );
  };

  // Render the table
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6" style={{ color: "#777", fontWeight: "bold" }}>
          Sharing History
        </Typography>
        <IconButton
          onClick={() => {
            /* close modal function here */
          }}
        ></IconButton>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Shared to</th>
              <th>Shared by</th>
              <th>Shared on</th>
              <th>Shared for</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className="shareInfoWrapper">
                    <PersonIcon />
                    <div>
                      <div>{row.sharedTo.name}</div>
                      <div>{row.sharedTo.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="shareInfoWrapper">
                    <PersonIcon />
                    <div>
                      <div>{row.sharedBy.name}</div>
                      <div>{row.sharedBy.email}</div>
                    </div>
                  </div>
                </td>

                <td style={{ textAlign: "center" }}>
                  {row.sharedOn.toDateString()}
                </td>
                <td style={{ textAlign: "center" }}>{row.sharedFor}</td>
                <td style={{ textAlign: "center" }}>
                  {renderStatusButton(row.status)}
                </td>
                <td style={{ textAlign: "center" }}>
                  <IconButton
                    disabled={!row.actions}
                    color="secondary"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          position: "relative",
          right: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <button
          className="page-button-style"
          disabled={page === 1}
          onClick={() => setPage(1)}
        >
          {"<<"}
        </button>
        <button
          className="page-button-style"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          {"<"}
        </button>
        {Array(Math.ceil(data.length / itemsPerPage))
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              className={`page-button-style ${
                page === index + 1
                  ? "page-button-active"
                  : "page-button-inactive"
              }`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        <button
          className="page-button-style"
          disabled={page === Math.ceil(data.length / itemsPerPage)}
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </button>
        <button
          className="page-button-style"
          disabled={page === Math.ceil(data.length / itemsPerPage)}
          onClick={() => setPage(Math.ceil(data.length / itemsPerPage))}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
