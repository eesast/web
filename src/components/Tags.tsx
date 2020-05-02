import React, { useState, useRef } from "react";
import { Input, Tag, Tooltip, Icon } from "antd";

export interface ITagsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const Tags: React.FC<ITagsProps> = (props) => {
  const { value, onChange } = props;
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const tagInputRef = useRef<Input>(null);

  const handleTagClose = (removedTag: string) => {
    const newTags = value.filter((tag) => tag !== removedTag);
    onChange(newTags);
  };

  const handleTagInputShow = () => {
    setTagInputVisible(true);
    tagInputRef.current?.focus();
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInputValue(e.target.value);
  };

  const handleTagInputConfirm = () => {
    const inputValue = tagInputValue;
    const newTags =
      inputValue && value.indexOf(inputValue) === -1
        ? [...value, inputValue]
        : value;
    setTagInputValue("");
    setTagInputVisible(false);
    onChange(newTags);
  };

  return (
    <div>
      {value.map((tag) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            // tslint:disable-next-line: jsx-no-lambda
            afterClose={() => handleTagClose(tag)}
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {tagInputVisible && (
        <Input
          name="tagInputValue"
          ref={tagInputRef}
          type="text"
          style={{ width: 78 }}
          value={tagInputValue}
          onChange={handleTagInputChange}
          onBlur={handleTagInputConfirm}
          onPressEnter={handleTagInputConfirm}
        />
      )}
      {!tagInputVisible && (
        <Tag
          onClick={handleTagInputShow}
          style={{ background: "#fff", borderStyle: "dashed" }}
        >
          <Icon type="plus" /> 新标签
        </Tag>
      )}
    </div>
  );
};

export default Tags;
