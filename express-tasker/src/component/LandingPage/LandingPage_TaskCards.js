import React, { Component } from "react";
import Slider from "react-slick";
import { Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Avatar } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress";
import background1 from "./1.jpg";
import background2 from "./2.jpg";
import background3 from "./3.jpg";
import background4 from "./4.jpg";
import background5 from "./5.jpg";
import background6 from "./6.jpg";
import background7 from "./7.jpg";
import background8 from "./8.jpg";
import background9 from "./9.jpg";
import background10 from "./10.jpg";
import { apiUrl } from "../../config.json";

const axios = require("axios").default;

const card_backgrounds = [
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7,
  background8,
  background9,
  background10,
];

class LandingPage_TaskCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top_rated_providers: [],
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getTopRatedProviders();
  };
  getTopRatedProviders = () => {
    const setState1 = (array) => {
      this.setState({ top_rated_providers: array });
    };

    const setLoadingStateFalse = () => {
      this.setState({ loading: false });
    };

    axios
      .post(apiUrl + "/search/service-provider/top-rated", {})
      .then(function (response) {
        const lst = response.data;
        setState1(lst);
        setLoadingStateFalse();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  renderCard = (card, index) => {
    if (typeof card !== "undefined") {
      return (
        <div className="provider-card">
          <div
            class="uppercard"
            style={{
              backgroundImage: `url(${
                card_backgrounds[this.state.top_rated_providers.indexOf(card)]
              })`,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ fontWeight: "bold", color: "white" }}
            >
              {card.username}
            </Typography>
            <div>
              <Avatar
                src="/broken-image.jpg"
                style={{ width: 150, height: 150 }}
              />
            </div>
            <div>
              <Typography
                variant="h3"
                gutterBottom
                style={{ fontWeight: "bold", color: "white" }}
              >
                {card.rating}
              </Typography>
              <Rating
                name="half-rating-read"
                precision={0.1}
                value={card.rating}
                readOnly
              />
            </div>
          </div>
          <div class="skills">
            {this.renderSkillSet(this.getSkillRows(card.skills.slice(0, 5), 2))}
          </div>
        </div>
      );
    } else {
    }
  };

  getSkillRows = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  renderSkillRow = (skillrow) => {
    return (
      <div
        style={{
          flexDirection: "row",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      >
        {skillrow.map(this.renderSkillChip)}
      </div>
    );
  };

  renderSkillSet = (skills) => {
    if (typeof skills !== "undefined") {
      return (
        <div
          style={{
            flexDirection: "column",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          {skills.map(this.renderSkillRow)}
        </div>
      );
    }
  };

  renderSkillChip = (skill) => {
    if (typeof skill !== "undefined") {
      return (
        <Chip
          icon={<DoneIcon />}
          label={skill}
          clickable="false"
          color="primary"
          variableWidth={true}
          deleteIcon={<DoneIcon />}
          style={{
            margin: "5px",
            backgroundColor: "#f28f00",
            color: "#00235e",
            fontWeight: "bold",
          }}
          size="large"
        />
      );
    }
  };

  handleLoading() {
    if (this.state.loading == true) {
      return (
        <div class="TaskCards-component">
          <CircularProgress
            size={90}
            style={{ strokeLinecap: "round" }}
            thickness={4}
            variant="indeterminate"
            disableShrink
            color="primary"
          />
        </div>
      );
    }
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      variableWidth: false,
    };

    return (
      <div className="TaskCards-component">
        <h1>Top Rated Taskers In Express Tasker</h1>
        {this.handleLoading()}
        <Slider {...settings}>
          {this.state.top_rated_providers.map((card) => this.renderCard(card))}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.tasker;
  return {
    user,
  };
};

export default LandingPage_TaskCards;
