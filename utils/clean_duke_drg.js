const fs = require("fs");

const rx = /^(\d+)( - )(.*)/;
/** Clean the duke data and populate missing fields */
function main() {
    let rawJSON = fs.readFileSync("../cleaned_json/duke_drg.csv.json")
    let data = JSON.parse(rawJSON);

    data.forEach((r) => {
        let match = rx.exec(r.drg_description);
        if (match) {
            r.drg_code = match[1];
            r.drg_description = match[3];
        }

        if (r.insured_avg_Patien_Responsibility === "-") {
            r.insured_avg_Patien_Responsibility = "0";
        }
        if (r.uninsured_avg_Patien_Responsibility === "-") {
            r.uninsured_avg_Patien_Responsibility = "0";
        }

        delete r.field6;
        delete r.field7;
        delete r.field8;
        delete r.field9;
        delete r.field10;
        Object.keys(r).forEach((k) => {
            let val = r[k];
            val = val.trim();
            r[k] = val;

        })
    });
    let finalJSON = JSON.stringify(data);
    fs.writeFileSync("../cleaned_json/duke_drg.csv.json", finalJSON);

    console.log(data[0]);
}

main();