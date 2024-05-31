// src/App.js
import React, { useState } from 'react';
import BudgetManager from './components/BudgetManager';
import CharacterViewer from './components/CharacterViewer';
import SkillTree from './components/SkillTree';
import skillsData from './assets/data.json'; // Assume you have your skills data in a JSON file
import './App.css'

function App() {
  const [selections, setSelections] = useState({ budget: 25 });
  
  const flattenSkills = (skills) => {
    let flatSkillsObject = {};
    Object.keys(skills).forEach(key => {
      skills[key].forEach(skill => {
        flatSkillsObject[skill.name] = skill;
      });
    });
    return flatSkillsObject;
  };

  const flatSkills = flattenSkills(skillsData);

  const handleSelectOption = (skill) => {
    if (!skill) return; // Exit if no skill provided

    // Check if skill has prerequisites and select them first
    if (skill.requires) {
      const requirements = Array.isArray(skill.requires) ? skill.requires : [skill.requires];
      requirements.forEach(requirement => {
        if (!selections[requirement]) {
          const requiredSkill = flatSkills[requirement];
          if (requiredSkill && selections.budget >= requiredSkill.cost) {
            handleSelectOption(requiredSkill);
          }
        }
      });
    }

    // Check budget and if the skill is already selected
    if (selections.budget >= skill.cost && !selections[skill.name]) {
      setSelections(prev => ({
        ...prev,
        [skill.name]: true,
        budget: prev.budget - skill.cost
      }));
    }
  };

  const handleDeselectOption = (skill) => {
    if (selections[skill.name]) {
      setSelections(prev => ({
        ...prev,
        [skill.name]: false,
        budget: prev.budget + skill.cost
      }));
    }
  };

  const handleReset = () => {
    setSelections({ budget: 25 });
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__character-viewer">
          <CharacterViewer selections={selections} skills={skillsData} onSelectOption={handleSelectOption} onDeselectOption={handleDeselectOption} />
        </div>
        <div className="app__budget-manager">
          <BudgetManager budget={selections.budget} />
        </div>
        <button className="app__reset-button" onClick={handleReset}>Reset</button>
      </div>
      <div className="app__skill-tree">
        <SkillTree selections={selections} onSelectOption={handleSelectOption} onDeselectOption={handleDeselectOption} skills={skillsData} />
      </div>
    </div>
  );
}

export default App;
