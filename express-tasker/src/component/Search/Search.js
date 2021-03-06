import "./SearchPage.css";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useRef, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, ButtonGroup, TableRow } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Switch } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";
import auth from "../../services/customerAuth";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Select,
} from "@material-ui/core";
import { color, fontWeight } from "@material-ui/system";
import { apiUrl } from "../../config.json";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const axios = require("axios").default;
var Scroll = require("react-scroll");
const useStyles = makeStyles({
  root: {
    height: "auto",
    minWidth: 275,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: "auto",
    width: 1000,
    backgroundColor: "#ffffff",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginBottom: 10,
  },
  submit: {
    margin: 20,
    backgroundColor: "#00235e",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#f28f00",
      fontWeight: "bold",
      color: "#02112a",
    },
  },
  textbox: {
    marginBottom: 20,
  },
  dropdown: {
    borderColor: "#000000",
    opacity: "100%",
  },
  provider_card: {
    backgroundColor: "#00235e",
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    color: "#ffffff",
    textAlign: "left",
    "&:hover": {
      backgroundColor: "#1a1f29",
    },
  },
  search_results: {
    backgroundColor: "#f28f00",
  },
  skills_group: {
    backgroundColor: "#f28f00",
  },
  skill: {
    backgroundColor: "#f28f00",
    fontWeight: "bold",
    color: "#00235e",

    "&:hover": {
      backgroundColor: "#ffffff",
      color: "#00235e",
      fontWeight: "bold",
    },
  },
  rating: {
    margin: "auto",
  },
  default_loc_div: {
    display: "flex",
    flexDirection: "row",
  },
  default_loc_switch: {},
});
var control_var = 0;
const Search = () => {
  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambanthota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullativu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];
  const classes = useStyles();
  var Element = Scroll.Element;
  var scroller = Scroll.scroller;
  var user = {};
  const [isLoading, setIsLoading] = useState(false);
  const [isResultFound, setIsResultFound] = useState(true);
  const [service_providers, setServiceProviders] = useState([]);
  const [location, setLocation] = useState();
  const [search_term, setSearchTerm] = useState("");
  const [search_critiria, setSearchCritiria] = useState();
  const [use_default_location, setUseDefaultLocation] = useState(true);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleUseDefaultLocation = (event) => {
    setUseDefaultLocation(event.target.checked);
  };
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchCritiriaChange = (event) => {
    setSearchCritiria(event.target.value);
  };

  //open function for snackbar of checking search term
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    control_var = 0;
    if (search_term.length <= 0) {
      setServiceProviders([]);

      setIsLoading(false);
      setOpen(true);
    } else {
      if (search_critiria == 0) {
        searchService(use_default_location, search_term, location);
      } else if (search_critiria == 1) {
        searchServiceProvider(search_term);
      } else {
        console.log("Please enter a search critiria");
      }
    }
    //should send to backend api and get the filtered results and update the service_providers;
  };

  const searchService = (use_default_location, search_term, location) => {
    if (use_default_location) {
      axios
        .post(apiUrl + "/search/service", {
          service: search_term,
          location: user.location, //This should be edited as user get data
        })
        .then(function (response) {
          const lst = response.data;
          setServiceProviders(lst);
          setIsLoading(false);
          handleScroll();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .post(apiUrl + "/search/service", {
          service: search_term,
          location: location,
        })
        .then(function (response) {
          const lst = response.data;

          setServiceProviders(lst);
          setIsLoading(false);
          handleScroll();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const searchServiceProvider = (service_provider) => {
    axios
      .post(apiUrl + "/search/service-provider", {
        service_provider: service_provider,
      })
      .then(function (response) {
        const lst = response.data;
        setServiceProviders(lst);
        setIsLoading(false);
        handleScroll();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleScroll = () => {
    scroller.scrollTo("search_results", {
      smooth: true,
      duration: 100,
      offset: -70,
    });
    control_var = 1;
  };

  const getCurrentUserObject = () => {
    const temp = auth.getCurrentUser();
    const user_id = temp._id;
    axios
      .post(apiUrl + "/customer/get-customer", {
        user_id: user_id,
      })
      .then(function (response) {
        const lst = response.data;
        user = lst;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCurrentUserObject();
  });
  ///////////////////////////////////////////////////////// UI related //////////////////////////////////////////////////////

  const loadingScreen = () => {
    if (isLoading) {
      return (
        <div>
          <LinearProgress
            size={60}
            style={{ height: 7 }}
            thickness={100}
            variant="indeterminate"
            disableShrink
            color="secondary"
          />
        </div>
      );
    }
  };

  const locationDropDown = () => {
    if (!use_default_location) {
      return (
        <Select
          className={classes.dropdown}
          native
          variant="outlined"
          margin="normal"
          value={location}
          onChange={handleLocationChange}
        >
          {districts.map((district) => {
            return <option value={district}>{district}</option>;
          })}

          <option value={1}>Search for a Service Provider </option>
        </Select>
      );
    } else {
      return null;
    }
  };

  const locationSearch = () => {
    const state = search_critiria == 0;
    console.log(state);
    if (state) {
      return (
        <div className={classes.default_loc_div}>
          <Typography
            style={{ fontWeight: "bold", color: "#00235e", fontSize: 15 }}
          >
            Use Default User Location
          </Typography>
          <Switch
            className={classes.default_loc_switch}
            defaultChecked={true}
            onChange={handleUseDefaultLocation}
            inputProps={{ "aria-label": "controlled" }}
          />
          {locationDropDown()}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderSkillSet = (skill, index) => {
    return (
      <Button
        className={classes.skill}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {skill}
      </Button>
    );
  };

  const renderServiceProviderCard = (card, index) => {
    return (
      <a href={`/service-provider-card/${card._id}`} className="sp-card">
        <Card sx={{ minWidth: 275 }} className={classes.provider_card}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <ButtonGroup
                disableElevation
                variant="contained"
                className={classes.skills_group}
              >
                {card.skills.map(renderSkillSet)}
              </ButtonGroup>
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h5" component="div">
                {card.username}
              </Typography>
              &nbsp;
              {card.isVerified ? (
                <VerifiedUserIcon style={{ color: "#f28f00" }} />
              ) : (
                <></>
              )}
            </div>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2">
              {card.location}
              <br />
            </Typography>
            <Typography variant="h4" component="div">
              {card.rating}
            </Typography>
            <Rating
              className={classes.rating}
              name="half-rating-read"
              precision={0.1}
              value={card.rating}
              readOnly
            />
          </CardContent>
        </Card>
      </a>
    );
  };
  return (
    <div>
      <header>
        <div className="header-main-text">
          <h1>
            The convenient & affordable way to get things done around the home
          </h1>
          <p>
            Choose from Experience Service Providers for help afordable price.
          </p>
        </div>

        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" gutterBottom component="div">
              Search for a Service / Service Provider
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Select
                className={classes.dropdown}
                native
                value={search_critiria}
                onChange={handleSearchCritiriaChange}
                variant="outlined"
                margin="normal"
                inputProps={{
                  name: "search-critiria",
                  id: "filled-critiria-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={0}>Search for a Service</option>
                <option value={1}>Search for a Service Provider </option>
              </Select>
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
              {locationSearch()}
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
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity="error"
          elevation={6}
          variant="filled"
        >
          Please, Enter a search term to proceed !
        </MuiAlert>
      </Snackbar>
      <div className="serviceProviderCard">
        <Element name="search_results"></Element>
        {loadingScreen()}
        {service_providers.map(renderServiceProviderCard)}
      </div>
    </div>
  );
};

export default Search;
