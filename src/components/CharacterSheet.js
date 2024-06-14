/**
 * @author Jenil-Narola
 * @description CharacterSheet component to display the character sheet with calculated values
 */
import { Alert, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SkillContext } from "../store/SkillContext";
import { SKILL_LIST } from "../consts";

const calculateAttributeModifier = (attributeValue) => {
  return Math.floor((attributeValue - 10) / 2);
}

const calculatePoints = (attributeModifier) => {
  return (10 + (4 * attributeModifier));
}

const calculateSkillValue = (numberOfAttributeModifier, spend) => {
  return numberOfAttributeModifier + spend;
}

const CharacterSheet = () => {
  const [characterSheet, setCharacterSheet] = useState([]);
  const [attributes] = useContext(SkillContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    const calculateSkills = () => {
      const updatedCharacterSheet = SKILL_LIST.map((skill) => {
        const attributeModifier = calculateAttributeModifier(attributes[skill.attributeModifier]);
        const points = calculatePoints(attributeModifier);
        const spend = points;
        const skillValue = calculateSkillValue(attributeModifier, spend);

        return {
          skill: skill.name,
          skillData: {
            attrModifier: skill.attributeModifier,
            numberOfAttributeModifier: attributeModifier,
            points,
            spend,
            skillValue,
          }
        };
      });

      setCharacterSheet(updatedCharacterSheet);
    };

    calculateSkills();
  }, [attributes]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/{Jenil-narola}/character', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attributes
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const data = await response.json();
      setError(false); // Reset error state on success

    } catch (error) {
      console.error('Error saving data:', error);
      setError(true); // Set error state on failure
    }
  }

  return (
    <Grid container sx={{ maxWidth: '750px' }} justifyContent='center'>
      <Button variant="outlined" sx={{ my: 3 }} onClick={handleSubmit}>Save Current Character Data</Button>
      {error && <Alert severity="error">Could not save the data. Please try again.</Alert>}
      <TableContainer component={Paper} sx={{ my: 3 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Skill</TableCell>
              <TableCell align="right">Spend</TableCell>
              <TableCell align="right">Modifier</TableCell>
              <TableCell align="right">Modifier Count</TableCell>
              <TableCell align="right">Skill Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characterSheet.map((skill) => (
              <TableRow key={skill.skill}>
                <TableCell component="th" scope="row">{skill.skill}</TableCell>
                <TableCell align="right">{skill.skillData.spend}</TableCell>
                <TableCell align="right">{skill.skillData.attrModifier}</TableCell>
                <TableCell align="right">{skill.skillData.numberOfAttributeModifier}</TableCell>
                <TableCell align="right">{skill.skillData.skillValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default CharacterSheet;
