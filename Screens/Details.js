import axios from "axios";
import React, { Component } from "react";
import { View, FlatList, StyleSheet, Alert, SafeAreaView } from "react-native";

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            imagePath: "",
            url: `http://localhost:5000/planetname=${this.props.navigation.getParam(
                "planet_name"
            )}`
        }
    }
    componentDidMount() {
        this.getDetails();
    }
    getDetails = () => {
        const { url } = this.state;
        axios
            .get(url)
            .then(response => {
                this.setDetails(response.data.data)
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    setDetails = planetDetalis => {
        const planetType = planetDetalis.planet_type;
        let imagePath = "";
        switch (planetType) {
            case "Gas Gaint":
                imagePath = require("../assets/gas_gaint.png")
                break;
            case "Terrestrial":
                imagePath = require("../assets/terrestrial.png")
                break;
            case "Super Earth":
                imagePath = require("../assets/super_earth.png")
                break;
            case "Neptune Like":
                imagePath = require("../assets/neptune_like.png")
                break;
            default:
                imagePath=require("../assets/gas_gaint.png")
        }
        this.setState({
            details:planetDetalis,
            imagePath:imagePath
        })
    }

    render() {
        const { details, imagePath } = this.state;
        if (details.specifications) {
          return (
            <View style={styles.container}>
              <Card
                title={details.name}
                image={imagePath}
                imageProps={{ resizeMode: "contain", width: "100%" }}
              >
                <View>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Gravity : ${details.gravity}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Orbital Period : ${details.orbital_period}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Orbital Speed : ${details.orbital_speed}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Mass : ${details.planet_mass}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Radius : ${details.planet_radius}`}</Text>
                  <Text
                    style={styles.cardItem}
                  >{`Planet Type : ${details.planet_type}`}</Text>
                </View>
                <View style={[styles.cardItem, { flexDirection: "column" }]}>
                  <Text>{details.specifications ? `Specifications : ` : ""}</Text>
                  {details.specifications.map((item, index) => (
                    <Text key={index.toString()} style={{ marginLeft: 50 }}>
                      {item}
                    </Text>
                  ))}
                </View>
              </Card>
            </View>
          );
        }
        return null;
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      cardItem: {
        marginBottom: 10
      }
    });
