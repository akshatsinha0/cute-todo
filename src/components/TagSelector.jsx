import { useState } from 'react';
import { defaultTags } from '../utils/tagsData';

const TagSelector = ({ selectedTags, onChange, maxSelect = 3 }) => {
  const [tags, setTags] = useState(defaultTags);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#000000');
  
  const handleTagClick = (tagId) => {
    const alreadySelected = selectedTags.includes(tagId);
    
    if (alreadySelected) {
      // Remove tag
      onChange(selectedTags.filter(id => id !== tagId));
    } else if (selectedTags.length < maxSelect) {
      // Add tag
      onChange([...selectedTags, tagId]);
    }
  };
  
  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    
    const newTag = {
      id: Date.now(),
      name: newTagName.trim(),
      color: newTagColor,
    };
    
    setTags([...tags, newTag]);
    onChange([...selectedTags, newTag.id]);
    
    // Reset form
    setNewTagName('');
    setShowAddTag(false);
  };
  
  const getTagById = (tagId) => {
    return tags.find(tag => tag.id === tagId);
  };
  
  return (
    <div className="tag-selector">
      <div className="tag-list">
        {tags.map(tag => (
          <button
            key={tag.id}
            type="button"
            className={`tag ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
            style={{ 
              '--tag-color': tag.color,
              '--tag-bg-color': `${tag.color}20`
            }}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </button>
        ))}
        
        <button
          type="button"
          className="add-tag-btn"
          onClick={() => setShowAddTag(!showAddTag)}
        >
          {showAddTag ? 'Cancel' : '+ Add Tag'}
        </button>
      </div>
      
      {showAddTag && (
        <div className="add-tag-form">
          <input
            type="text"
            placeholder="Tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            maxLength={15}
          />
          <input
            type="color"
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
            className="color-picker"
          />
          <button
            type="button"
            className="btn-primary save-tag-btn"
            onClick={handleAddTag}
          >
            Save
          </button>
        </div>
      )}
      
      {selectedTags.length > 0 && (
        <div className="selected-tags">
          <span className="selected-tags-label">Selected:</span>
          {selectedTags.map(tagId => {
            const tag = getTagById(tagId);
            return (
              <span 
                key={tagId} 
                className="selected-tag"
                style={{ backgroundColor: tag?.color }}
              >
                {tag?.name}
                <button 
                  type="button" 
                  className="remove-tag-btn"
                  onClick={() => handleTagClick(tagId)}
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
      )}
      
      <style jsx>{`
        .tag-selector {
          margin-bottom: 15px;
        }
        
        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }
        
        .tag {
          background-color: var(--tag-bg-color);
          color: var(--tag-color);
          border: 1px solid var(--tag-color);
          border-radius: 15px;
          padding: 4px 12px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .tag.selected {
          background-color: var(--tag-color);
          color: white;
        }
        
        .add-tag-btn {
          background: transparent;
          border: 1px dashed #aaa;
          color: #666;
          border-radius: 15px;
          padding: 4px 12px;
          font-size: 0.85rem;
          cursor: pointer;
        }
        
        .add-tag-form {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          animation: fadeIn 0.3s ease;
        }
        
        .color-picker {
          width: 40px;
          height: 38px;
          padding: 0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .save-tag-btn {
          padding: 5px 15px;
        }
        
        .selected-tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
        }
        
        .selected-tags-label {
          color: #666;
          font-size: 0.85rem;
        }
        
        .selected-tag {
          display: flex;
          align-items: center;
          background-color: #ddd;
          color: white;
          border-radius: 15px;
          padding: 3px 8px;
          font-size: 0.85rem;
        }
        
        .remove-tag-btn {
          background: transparent;
          border: none;
          color: white;
          margin-left: 5px;
          font-size: 1rem;
          line-height: 1;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default TagSelector;
