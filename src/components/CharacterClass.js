/**
 * @author Jenil-Narola
 * @description CharacterClass component to display character class information
 */
import { useState, useEffect } from "react";
import { Card, Collapse, Grid, Typography } from "@mui/material";
import { SkillContext } from "../store/SkillContext";
import { useContext } from "react";

// Component to display printable attributes in a list format
const PrintableAttributes = ({ minAttributes }) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      {Object.entries(minAttributes).map(([key, value]) => (
        <Grid item key={key}>
          <Typography variant="body1">{`${key}: ${value}`}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

// CharacterClass component to display character class information
const CharacterClass = ({ characterName, minAttributes }) => {
  const [isAchievable, setIsAchievable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [attributes] = useContext(SkillContext);

  // Effect to check if the character class is achievable based on current attributes
  useEffect(() => {
    const isAchievable = Object.keys(minAttributes).every(
      (key) => attributes[key] >= minAttributes[key]
    );
    setIsAchievable(isAchievable);
  }, [attributes, minAttributes]);

  // Toggle expanded state of the collapse section
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <Card
          variant="outlined"
          sx={{
            p: 3,
            backgroundColor: isAchievable ? 'green' : 'blue',
            cursor: 'pointer',
          }}
          onClick={handleExpandClick}
        >
          <Typography variant="h5">{characterName}</Typography>
        </Card>
        <Collapse in={expanded}>
          <Card variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">Minimum Attributes:</Typography>
            <PrintableAttributes minAttributes={minAttributes} />
          </Card>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default CharacterClass;
