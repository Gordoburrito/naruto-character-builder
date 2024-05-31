import React from 'react';

const SkillButton = ({ skill, selections, onSelectOption, onDeselectOption, areRequirementsMet, skills }) => {
  const { name, cost, requires } = skill;
  const requirementText = requires ? `Requires: ${Array.isArray(requires) ? requires.join(', ') : requires}` : '';

  const getButtonColor = () => {
    if (selections[name]) {
      return 'yellow'; // Selected
    } else if (isDisabled()) {
      return 'gray'; // Not available
    }
    return 'green'; // Available
  };

  const isDisabled = () => {
    if (selections[name] || cost > selections.budget) {
      return true;
    }
    return requires && !areRequirementsMet(requires);
  };

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
  console.log(flatSkills)

  const handleClick = () => {
    if (selections[name]) {
      onDeselectOption(skill);
    } else {
      onSelectOption(skill);
    }
  };

  return (
    <button
      key={name}
      onClick={handleClick}
      style={{ borderColor: getButtonColor(), borderWidth: '2px', borderStyle: 'solid' }}
      title={requirementText}
    >
      <img src={skill.image} style={{ width: '50px', height: '50px' }} />
      {name} - Cost: {cost} {requirementText ? ` (${requirementText})` : ''}
    </button>
  );
};

export default SkillButton;

