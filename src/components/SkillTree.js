import React from 'react';
import SkillButton from './SkillButton';
import './SkillTree.css';

const SkillTree = ({ selections, onSelectOption, onDeselectOption, skills }) => {
  const areRequirementsMet = (requires) => {
    const requirements = Array.isArray(requires) ? requires : [requires];
    return requirements.every(requirement => selections[requirement]);
  };

  const renderSkillButton = (skill) => (
    <SkillButton
      key={skill.name}
      skill={skill}
      selections={selections}
      onSelectOption={onSelectOption}
      onDeselectOption={onDeselectOption}
      areRequirementsMet={areRequirementsMet}
      skills={skills}
    />
  );

  const renderSkillCategories = () => {
    return Object.keys(skills).map(category => (
      <div key={category}>
        <h3>{category}</h3>
        <div className="skill-tree__skills">
          {skills[category].map(renderSkillButton)}
        </div>
      </div>
    ));
  };

  return (
    <div>
      {renderSkillCategories()}
    </div>
  );
};

export default SkillTree;
