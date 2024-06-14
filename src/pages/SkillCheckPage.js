/**
 * @author Jenil-Narola
 * @description SkillCheckPage component to display the Skill Check Page
 */

import React from 'react';
import { CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material';
import SkillCheck from '../components/SkillCheck';
import CharacterClass from '../components/CharacterClass';
import SkillControls from '../components/SkillControls';
import CharacterSheet from '../components/CharacterSheet';
import { CLASS_LIST } from '../consts';
import darkTheme from '../theme';

const SkillCheckPage = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container direction="column" alignItems="center" spacing={4} sx={{ p: 4 }}>
        <Typography variant="h1" align="center">Skill Check Page</Typography>

        {/* Skill Check Section */}
        <Grid item sx={{ width: '100%', mb: 4 }}>
          <SkillCheck />
        </Grid>

        {/* Character Class Section */}
        <Grid item container direction="column" alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <Typography variant="h2" align="center">Character Classes</Typography>
          {Object.keys(CLASS_LIST).map((className) => (
            <Grid item key={className} sx={{ width: '100%' }}>
              <CharacterClass characterName={className} minAttributes={CLASS_LIST[className]} />
            </Grid>
          ))}
        </Grid>

        {/* Attributes and Skills Section */}
        <Grid item container direction="row" justifyContent="space-around" alignItems="flex-start" sx={{ width: '100%', mt: 6 }} spacing={2}>
          <Grid item sx={{ flex: 1 }}>
            <Typography variant="h2" align="center">Attributes</Typography>
            <SkillControls />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <Typography variant="h2" align="center">Skills</Typography>
            <CharacterSheet />
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SkillCheckPage;
