const arr = [
    {"color": "#000000"},
    {"color": "#0000FF"},
    {"color": "#2F4F4F"},
    {"color": "#B22222"},
    {"color": "#8B4513"},
    {"color": "#9400D3"},
    {"color": "#FF0000"},
    {"color": "#2E8B57"},
    {"color": "#8A2BE2"},
    {"color": "#4682B4"},
    {"color": "#7CFC00"},
    {"color": "#7B68EE"},
    {"color": "#00BFFF"}
];

export const randomColors = () => {return arr.sort(() => Math.random() - 0.5)};
//export const color = () => {return arr[ Math.floor(Math.random() * arr.length)]};