/**
 * @author Jenil-Narola
 * @description SkillControls component to control the attributes
 */
import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SkillContext } from "../store/SkillContext";
import { ATTRIBUTE_LIST } from "../consts";

const AttributeControl = ({ attribute }) => {

  const [attributes, setAttributes] = useContext(SkillContext);
  const [disable, setDisable] = useState(false);

  const handleIncrement = () => {
    let attributeInitialValue = attributes[attribute];
    let newState = {
      ...attributes,
      [attribute]: attributeInitialValue + 1,
    }
    setAttributes(newState);
  }
  const handleDecrement = () => {
    let attributeInitialValue = attributes[attribute];
    let newState = {
      ...attributes,
      [attribute]: attributeInitialValue - 1,
    }
    setAttributes(newState);
  }

  useEffect(() => {
    if (attributes) {
      let sum = 0;
      Object.entries(attributes).map((attribute) => (
        sum += attribute[1]
      ));

      setDisable(sum > 70);
    }
  }, [attributes]);

  return (
    <Grid
      sx={{ minWidth: "25ch" }}
      container
      margin="auto"
      justifyContent="center"
      alignItems="center">
      <Grid sx={{ minWidth: "25ch", fontSize: "1.5em" }}>{attribute} : {attributes[attribute]}</Grid>
      <Button
        variant="outlined"
        onClick={handleDecrement}
      > - </Button>
      <Grid sx={{ minWidth: "2ch" }}></Grid>
      <Button
        variant="outlined"
        onClick={handleIncrement}
        disabled={disable}
      > + </Button>
      {disable && <Grid sx={{ minWidth: "25ch", fontSize: "1.5em", color: "red" }}>Sum of all attributes should be less than 70</Grid>}
    </Grid>
  );
}

const SkillControls = () => {
  return (
    <Grid container>
      {ATTRIBUTE_LIST.map((attribute) => (
        <AttributeControl attribute={attribute} key={attribute} />
      ))}
    </Grid>
  );
}

export default SkillControls;
