/**
 * @author Jenil-Narola
 * @description SkillContextProvider component to provide the SkillContext to the application
 */

import { createContext, useEffect, useState } from "react";

export const SkillContext = createContext({});


const SkillContextProvider = (props) => {
  const [skill, setSkill] = useState({
    'Strength': 0,
    'Dexterity': 0,
    'Constitution': 0,
    'Intelligence': 0,
    'Wisdom': 0,
    'Charisma': 0,
  });

  useEffect(() => {
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{Jenil-narola}/character', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {

        console.log(data);
        setSkill(data?.body?.attributes);
      });
  }, []);

  return (
    <SkillContext.Provider value={[skill, setSkill]}>
      {props.children}
    </SkillContext.Provider>
  );
}

export default SkillContextProvider;

