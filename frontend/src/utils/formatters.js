export const formatMoney = (v)=> "₹ " + Number(v).toLocaleString();
export const formatDate = (d)=> new Date(d).toLocaleDateString("en-IN");
