import React from 'react';

class Attribute extends React.Component{
    constructor(props){
        super(props);
        this.isSwatch = (this.props.type === 'swatch');
    }

    isSelectedAttribute = (item) => {
        const matchedAttribute = this.props.selectedAttributes.find(attribute => attribute.name === this.props.name);

        if(!matchedAttribute){
            return false;
        }

        return item.value === matchedAttribute.value;
    }
    

    render(){
        return (
            <div className={`item_attribute`}>
            <p className='item_attribute_name'>{this.props.name}:</p>
            {this.props.items.length > 0
            &&
                <div className='item_attribute_items'>
                    {this.props.items.map(item => 
                        this.isSwatch //ternary for better readability instead of conditional attributes
                        ? 
                        <div 
                        onClick={this.props.isMutable ? () => this.props.handleAttributeChange(this.props.name, item.value) : undefined}
                        key={item.id}
                        className={this.isSelectedAttribute(item) ? 'attribute_swatch_selected' : 'attribute_swatch'}
                        style={{backgroundColor: item.value}}/>
                        : 
                        <div
                        onClick={this.props.isMutable ? () => this.props.handleAttributeChange(this.props.name, item.value) : undefined}
                        key={item.id}
                        className={this.isSelectedAttribute(item) ? 'attribute_common_selected' : 'attribute_common'}>
                            <p className='attribute_common_value'>{item.value}</p>
                        </div>
                    )}
                </div>}
            </div>
        );
    }
}

export default React.memo(Attribute)