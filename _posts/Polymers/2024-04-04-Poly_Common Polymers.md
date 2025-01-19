---
title: Common Polymers
tags: Polymers
layout: post
excerpt: Some common polymers
---

# Common Polymers


<img src="\assets\images\Types Of Polymers.jpg" alt="Types Of Polymers" width="700" height="400" />

<body>
    <table id="sortableTable">
        <thead>
            <tr>
                <th onclick="sortTable(0)">Polymer</th>
                <th onclick="sortTable(1)">Tg (°C)</th>
                <th onclick="sortTable(2)">Entanglement Mw (g/mol)</th>
                <th onclick="sortTable(3)">Tm (°C)</th>
                <th onclick="sortTable(4)">Crystallinity</th>
                <th onclick="sortTable(5)">Common Uses</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Low-Density Polyethylene (LDPE)</td>
                <td>-110</td>
                <td>1,300</td>
                <td>110</td>
                <td>55%</td>
                <td>Plastic bags and films, Containers and bottles, Coatings for paper and textiles</td>
            </tr>
            <tr>
                <td>High-Density Polyethylene (HDPE)</td>
                <td>-120</td>
                <td>1,600</td>
                <td>130-137</td>
                <td>75%</td>
                <td>Plastic bottles and containers, Piping and tubing, Plastic lumber and furniture</td>
            </tr>
            <tr>
                <td>Polypropylene (PP)</td>
                <td>-20</td>
                <td>3,000</td>
                <td>150</td>
                <td>60%</td>
                <td>Packaging (food containers, bottle caps), Textiles (ropes, thermal underwear), Automotive parts (bumpers, dashboards)</td>
            </tr>
            <tr>
                <td>Polyvinyl Chloride (PVC)</td>
                <td>81</td>
                <td>2,500</td>
                <td>185</td>
                <td>Mostly amorphous (<10%)</td>
                <td>Pipes and fittings, Vinyl siding and window frames, Electrical cable insulation</td>
            </tr>
            <tr>
                <td>Polyethylene Terephthalate (PET)</td>
                <td>75</td>
                <td>20,000</td>
                <td>255</td>
                <td>Amorphous or crystalline.</td>
                <td>Beverage bottles, Food packaging, Synthetic fibers (e.g., polyester clothing), Engineering plastics</td>
            </tr>
            <tr>
                <td>Polyurethane (PU)</td>
                <td>-10</td>
                <td>3,500</td>
                <td>Varies widely</td>
                <td>Amorphous to semi-crystalline</td>
                <td>Foam cushioning (furniture, mattresses), Insulation panels, Coatings and adhesives, Elastomers (wheels, tires, seals)</td>
            </tr>
            <tr>
                <td>Polystyrene (PS)</td>
                <td>100</td>
                <td>17,500</td>
                <td>N/A</td>
                <td>Mostly amorphous (<10%)</td>
                <td>Packaging (disposable cutlery, plastic cups, food containers), Insulation (expanded polystyrene - EPS), Consumer products (CD/DVD cases, toys, model kits)</td>
            </tr>
        </tbody>
    </table>

    <script>
       function sortTable(columnIndex) {
    const table = document.getElementById("sortableTable");
    let rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[columnIndex];
            y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
            
            const xValue = x.innerHTML.trim();
            const yValue = y.innerHTML.trim();
            
            // Remove commas and parse numeric values
            const xNumeric = parseFloat(xValue.replace(/,/g, ''));
            const yNumeric = parseFloat(yValue.replace(/,/g, ''));
            
            // Determine if the content is numeric
            const xIsNumeric = !isNaN(xNumeric) && isFinite(xNumeric);
            const yIsNumeric = !isNaN(yNumeric) && isFinite(yNumeric);
            
            if (xIsNumeric && yIsNumeric) {
                // Both values are numeric
                if (dir === "asc") {
                    if (xNumeric > yNumeric) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (xNumeric < yNumeric) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (xIsNumeric && !yIsNumeric) {
                // Numeric comes before non-numeric
                if (dir === "asc") {
                    shouldSwitch = true;
                    break;
                }
            } else if (!xIsNumeric && yIsNumeric) {
                // Non-numeric comes after numeric
                if (dir === "desc") {
                    shouldSwitch = true;
                    break;
                }
            } else {
                // Both are non-numeric
                if (dir === "asc") {
                    if (xValue.toLowerCase() > yValue.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (xValue.toLowerCase() < yValue.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

    </script>
</body>