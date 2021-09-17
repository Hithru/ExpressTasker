
import "./SearchPage.css";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { TextField } from "@material-ui/core";
import { FormControlLabel,Checkbox,Grid,Link,Select, } from "@material-ui/core";
import { color } from "@material-ui/system";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius:10,
    marginTop:50,
    marginBottom:50,
    width:1000,

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginBottom: 10,
  },
  submit: {
    margin: 20,
    backgroundColor: '#00235e',
    fontWeight:'bold',
    '&:hover': {
      backgroundColor: '#f28f00',
      fontWeight:'bold',
      color:'#02112a'
    },
  },
  textbox:{
    marginBottom:20
  },
  dropdown:{
    borderColor:'#000000'
  },
  provider_card:{
    backgroundColor:'#00235e',
    marginLeft: 100,
    marginRight:100,
    marginTop:20,
    marginBottom:10,
    borderRadius:10,
    color:"#ffffff",
    textAlign:"left",
  }
});

const Search = () => {
  const classes = useStyles();
  const service_providers = [
    {username:"Service Provider A",skill:"Skill A",location:"Location A"},
    {username:"Service Provider B",skill:"Skill B",location:"Location B"},
    {username:"Service Provider C",skill:"Skill C",location:"Location C"},

  ];
  const [search_term,setSearchTerm] = useState();
  const [search_critiria, setSearchCritiria] = useState();
  const handleSearchTermChange =(event)=>{
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  }
  const handleSearchCritiriaChange = (event)=>{
    setSearchCritiria(event.target.value);
  }
  
  const handleSubmit = () =>{
    console.log(search_term);
    //should send to backend api and get the filtered results and update the service_providers;
  }

  const renderServiceProviderCard = (card,index)=>{
    return(
      <Card sx={{ minWidth: 275 }} className={classes.provider_card}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {card.skill}
        </Typography>
        <Typography variant="h5" component="div">
          {card.username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        </Typography>
        <Typography variant="body2">
          {card.location}
          <br />
        </Typography>
      </CardContent>
    </Card>
    );
  }
  return (
    <div>
    <header>
            <div className="header-main-text">
              <h1>
                The convenient & affordable way to get things done around the home
              </h1>
              <p>
                Choose from over 140,000 vetted Taskers for help without breaking the
                bank.
              </p>
            </div>
            <Card className={classes.root}>
            <CardContent>
          <Typography varient='h1'>
            Search for a Service / Service Provider
          </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            className={classes.textbox}
            value={search_term}
            onChange={handleSearchTermChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="search-term"
            label="Search Term"
            name="search-term"
          />
        <Select
          className = {classes.dropdown}
          native
          value={search_critiria}
          onChange={handleSearchCritiriaChange}
          variant="outlined"
          onChange={()=>{}}
          margin="normal"
          inputProps={{
            name: 'search-critiria',
            id: 'filled-critiria-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={0}>Search for a Service</option>
          <option value={1}>Search for a Service Provider </option>
        </Select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}  
          >
            SEARCH
          </Button>
        </form>
            </CardContent>
            </Card>
    
    </header>
    <div>
    {service_providers.map(renderServiceProviderCard)}
    </div>
    </div>
  );
}
 
export default Search;

