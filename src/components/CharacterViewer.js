// src/components/CharacterViewer.js
import React from 'react';
import './CharacterViewer.css';
import SkillButton from './SkillButton';

const CharacterViewer = ({ selections, skills, onSelectOption, onDeselectOption }) => {
  if (!skills) {
    console.error('Skills data is not passed to CharacterViewer');
    return <div>No skills data available.</div>;
  }

  const flattenSkills = (skills) => {
    let flatSkillsObject = {};
    Object.keys(skills).forEach(key => {
      skills[key].forEach(skill => {
        flatSkillsObject[skill.name] = skill;
      });
    });
    return flatSkillsObject;
  };

  const flatSkills = flattenSkills(skills);

  console.log("flatSkills", flatSkills);
  console.log("selections", selections);

  return (
    <div className="character-viewer">
      <h2 className="character-viewer__title">Character Traits</h2>
      <ul className="character-viewer__list">
        {Object.keys(selections).map(key => (
          selections[key] === true && flatSkills[key] && (
            <li className="character-viewer__item" key={key}>
              <SkillButton
                skill={flatSkills[key]}
                selections={selections}
                onSelectOption={onSelectOption}
                onDeselectOption={onDeselectOption}
                areRequirementsMet={() => true}
                skills={skills}
                showName={false}
              />
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default CharacterViewer;
