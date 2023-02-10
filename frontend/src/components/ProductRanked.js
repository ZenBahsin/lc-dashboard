import React from "react";
import { useState, useEffect } from "react";
import Numeral from "react-numeral";

const styles = {
  table: {
    width: "30%",
    borderSpacing: "10px",
    borderCollapse: "separate"
  },
  td: {
    textAlign: "center",
    padding: "8px",
    borderRadius: "25px",
    backgroundColor: "#FFA92E",
    color: "white",
  },
};

const ProductRanked = () => {
  const [data, setdata] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "http://localhost:8000/api/productranked?startdate=2022-01-01&enddate=2022-12-30"
    )
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading Product Ranked...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div
      style={{
        height: "60vh",
        position: "relative",
        marginBottom: "1%",
        padding: "1%",
      }}
    >
      <table style={styles.table}>
        {data.getDataProductRanked.map((data, index) => (
          <tr key={`key-${index}`}>
            <td>{data.product}</td>
            <td style={styles.td}>
              {<Numeral value={data.revenue_growths} format={"0,0"} />}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ProductRanked;
