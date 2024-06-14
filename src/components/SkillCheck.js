/**
 * @author Jenil-Narola
 * @description SkillCheck component to perform a skill check
 */
import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { SKILL_LIST } from '../consts';

const SkillCheck = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [dc, setDc] = useState('');
  const [rollResult, setRollResult] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleRoll = () => {
    try {
      const randomRoll = Math.floor(Math.random() * 20) + 1;
      const skill = SKILL_LIST.find(skill => skill.name === selectedSkill);
      if (!skill) {
        throw new Error('Selected skill not found.');
      }

      // Example: Replace with actual logic to fetch character's attribute modifier
      const attributeModifier = 5;

      const total = randomRoll + attributeModifier;
      const isSuccess = total >= parseInt(dc);

      setRollResult(randomRoll);
      setSuccess(isSuccess);
      setError('');
    } catch (error) {
      console.error('Error during skill check:', error);
      setError('An error occurred during skill check.');
    }
  };

  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'grey.500', borderRadius: 1, mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Skill</InputLabel>
        <Select
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
        >
          {SKILL_LIST.map((skill) => (
            <MenuItem key={skill.name} value={skill.name}>
              {skill.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="DC"
        type="number"
        fullWidth
        value={dc}
        onChange={(e) => setDc(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleRoll}
        fullWidth
        disabled={!selectedSkill || !dc}
      >
        Roll
      </Button>
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {rollResult !== null && (
        <Box sx={{ mt: 2 }}>
          <Typography>Random Roll: {rollResult}</Typography>
          <Typography>Skill Check: {success ? 'Success' : 'Failure'}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default SkillCheck;
