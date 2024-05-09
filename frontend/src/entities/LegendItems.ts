import LegendItem from "./LengendItem";


let legendItems = [

  new LegendItem(
    "0",
    "#ffffff",
    (cases: number) => cases === 0,
    null
  ),

  new LegendItem(
    "1-2",
    "#ebd4d4",
    (cases: number) => cases >= 1 && cases <= 2,
    null
  ),

  new LegendItem(
    "3-5",
    "#d8aaaa",
    (cases: number) => cases >= 3 && cases <= 5,
    null
  ),

  new LegendItem(
    "6-8",
    "#c57f7f",
    (cases: number) => cases >= 6 && cases <= 8,
    null
  ),

  new LegendItem(
    "9-12",
    "#b15555",
    (cases: number) => cases >= 9 && cases <= 12,
    null
  ),

  new LegendItem(
    "13-15",
    "#9e2a2a",
    (cases: number) => cases > 12 && cases <= 15,
    null
  ),

  new LegendItem(
    "15+",
    "#8b0000",
    (cases: number) => cases > 15,
    null
  ),
];

export default legendItems;

/**
 * 7 > 1 million                        #8b0000
 * 6 >= 500 thousand < 1 million        #9e2a2a
 * 5 >= 200 thousand < 500 thousand     #b15555
 * 4 >= 100 thousand  < 200 Thousand    #c57f7f
 * 3 > 50 thousand < 100 thousand       #d8aaaa
 * 2 >= 0 < 50 thousand                 #ebd4d4
 * 1 NO DATA                            #ffffff
 */

/*

#741f1f // Really red
#9c2929 // more red
#c57f7f // red
#d8aaaa //more pink
#ebd4d4 //pink
#ffffff //white
*/
