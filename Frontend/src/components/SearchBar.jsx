import { useState } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';


// eslint-disable-next-line react/prop-types
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const blogsInTheStore = useSelector((state) => state.currentBlogs.value);
    const blogNames = blogsInTheStore.map(d => d.title);
    const filteredData = blogNames.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <TextField
                fullWidth
                label="Search"
                variant="outlined"
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-4"
            />
            <List>
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <ListItem key={item.id}>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No results found" />
                    </ListItem>
                )}
            </List>
        </div>
    );
}

export default SearchBar;
