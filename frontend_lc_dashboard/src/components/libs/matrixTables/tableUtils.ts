interface TableData {
    sourcetype: any;
    [key: string]: { ach: number }[];
  }
  
  export const processData = (data: any) => {
    const hasil: TableData[] = [];
  
    data.forEach((tableData: any) => {
      const sourcetype = tableData.sourcetype;
      const product = tableData.product?.trim();
      const ach = Number(tableData.ach);
  
      const index = hasil.findIndex(
        (hasilData) => hasilData.sourcetype === sourcetype
      );
  
      if (index === -1) {
        hasil.push({
          sourcetype,
          ...(product && { [product]: [{ ach }] }),
        });
      } else {
        hasil[index][product] = [{ ach }];
      }
    });
  
    console.log("HASILe", hasil);
    return hasil;
  };
  