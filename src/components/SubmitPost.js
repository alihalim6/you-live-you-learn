import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	View, 
	TouchableOpacity, 
	TextInput, 
	Text, 
	Image,
	SafeAreaView,
	FlatList
} from 'react-native';
import {WHITE, PAGE, getCurrentPage} from '../constants/AppConstants';
import {
  PostStyles,
  captionBarStyles,
  upperContainerStyles,
  postVisiblityDisabledLabel,
  tagTypeStyles,
  tagColorStyles
} from '../styles/PostStyles';
import {
  PUBLIC,
  PRIVATE,
  TEXT,
  COLOR,
  RECENTLY_USED,
  TAG_COLORS,
  RECENTLY_USED_TAGS_PLACEHOLDER,
  TAG_PLACEHOLDER
} from '../constants/PostConstants';
import {showOverlay} from '../redux/actions/OverlayActions';
import PageStyles from '../styles/PageStyles';

class SubmitPost extends Component{
	 state = {
    captionBlurred: false,
    postVisiblitySelected: null,
    viewingTagType: RECENTLY_USED,
    tagColorSelected: TAG_COLORS[0],
    currentTextTag: null,
    textTags: [],
    recentlyUsedTags: [{label: 'world history'}, {label: 'science'}, {label: '#flyShit'}],
    //recentlyUsedTags: [],
    caption: null
  };

  componentDidMount(){
    if(!this.props.signedIn){
      this.setState({postVisiblitySelected: PRIVATE});
    }
  }

	captionPressed = () => {
    this.refs.caption.focus();
  }

  captionTyped = (caption) => {
    const currentCaption = (caption.trim() ? caption : null);
    this.setState({caption: currentCaption});
  }

  postVisiblityPressed = (visibility) => {
    //visibility only changeable for signed in users
    if(this.props.signedIn){
      this.setState({postVisiblitySelected: visibility});
    }
  }

  privatePostSelected = () => {
    return (this.state.postVisiblitySelected === PRIVATE);
  }

  publicPostSelected = () => {
    return (this.state.postVisiblitySelected === PUBLIC);
  }

  publicPostsDisabled = () => {
    return !this.props.signedIn;
  }

  tagTypePressed = (type) => {
    this.setState({viewingTagType: type});
  }

  tagColorPressed = (color) => {
    this.setState({tagColorSelected: color});
  }

  textTagChanged = (value) => {
    this.setState({currentTextTag: value});
  }

  textTagAdded = () => {
    const tagAlreadyAdded = this.state.textTags.find(tag => (this.state.currentTextTag === tag));

    if(!tagAlreadyAdded && this.state.currentTextTag){
      const currentTags = this.state.textTags;
      this.setState({textTags: [...currentTags, this.state.currentTextTag]});
      this.refs.textTagField.clear();
      this.refs.textTagField.focus();
    }
  }

  textTagRemoved = (removedTag) => {
    this.setState({textTags: this.state.textTags.filter(addedTag => removedTag !== addedTag)});
  }

  recentlyUsedTagAdded = (addedTag) => {
    //move added tag to beginning of list
    /*let recentlyUsedTags = this.state.recentlyUsedTags;
    recentlyUsedTags = recentlyUsedTags.filter(tag => addedTag.label !== tag.label);
    recentlyUsedTags.unshift({label: addedTag.label, added: true});
    this.setState({recentlyUsedTags});*/

    addedTag.added = true;
    let recentlyUsedTags = this.state.recentlyUsedTags;
    const addedTagIndex = recentlyUsedTags.findIndex(tag => addedTag.label === tag.label);
    recentlyUsedTags.splice(addedTagIndex, 1, addedTag);
    this.setState({recentlyUsedTags});
  }

  recentlyUsedTagRemoved = (removedTag) => {
    removedTag.added = false;
    let recentlyUsedTags = this.state.recentlyUsedTags;
    const removedTagIndex = recentlyUsedTags.findIndex(tag => removedTag.label === tag.label);
    recentlyUsedTags.splice(removedTagIndex, 1, removedTag);
    this.setState({recentlyUsedTags});
  }

  textTagsCount = () => {
    return (this.state.textTags.length ? '(' + this.state.textTags.length + ')' : '')
  }

  recentlyUsedTagsCount = () => {
    const recentlyUsedTagsAdded = ((this.state.recentlyUsedTags.filter(recentTag => recentTag.added)).length);
    return (recentlyUsedTagsAdded ? '(' + recentlyUsedTagsAdded + ')' : '');
  }

	render(){
		return (
      <>
      	<Text style={PageStyles.title}>SUBMIT POST</Text>
        
        <View style={[PostStyles.postSubmitFormUpperContainer, upperContainerStyles(this.props)]}>
          {this.props.mediaUri &&
            <TouchableOpacity style={PostStyles.postImageContainer} onPress={() => null}>
              <Image style={PostStyles.postImage} source={{uri: this.props.mediaUri}}/>
            </TouchableOpacity>
          }

          <TouchableOpacity onPress={() => this.captionPressed()} style={[PostStyles.captionBar, captionBarStyles(this.props, this.state)]}>
            <TextInput 
              ref='caption'
              returnKeyType='done'
              style={PostStyles.caption}
              placeholder={this.props.captionPlaceholder} 
              onChangeText={caption => this.captionTyped(caption)}
              onFocus={() => this.setState({captionBlurred: false})}
              onBlur={() => this.setState({captionBlurred: true})}/>
          </TouchableOpacity>
        </View>

        <Text style={PostStyles.configTitle}>POST VISIBILITY{this.props.signedIn && <Text>*</Text>}</Text>

        <View style={PostStyles.postVisiblityContainer}>
          <TouchableOpacity
            style={PostStyles.postVisiblityOptionContainer}
            onPress={() => this.postVisiblityPressed(PRIVATE)}>
              {this.privatePostSelected() &&
                <Image style={PostStyles.postVisiblityIcon} source={require('../assets/checkbox-check.png')}/>
              }

              {!this.privatePostSelected() &&
                <Image style={PostStyles.postVisiblityIcon} source={require('../assets/checkbox.png')}/>
              }

              <Text style={PostStyles.postVisiblityLabel}>{PRIVATE}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={PostStyles.postVisiblityOptionContainer}
            onPress={() => this.postVisiblityPressed(PUBLIC)}>
              {this.publicPostSelected() &&
                <Image style={PostStyles.postVisiblityIcon} source={require('../assets/checkbox-check.png')}/>
              }

              {!this.publicPostSelected() && !this.publicPostsDisabled() &&
                <Image style={PostStyles.postVisiblityIcon} source={require('../assets/checkbox.png')}/>
              }

              {this.publicPostsDisabled() &&
                <Image style={PostStyles.postVisiblityIcon} source={require('../assets/checkbox-lock.png')}/>
              }

              <Text style={[PostStyles.postVisiblityLabel, postVisiblityDisabledLabel(this.publicPostsDisabled())]}>{PUBLIC}</Text>
          </TouchableOpacity>
        </View>

        <Text style={PostStyles.configTitle}>TAGS</Text>

        <View style={PostStyles.tagTypeContainer}>
          <TouchableOpacity onPress={() => this.tagTypePressed(RECENTLY_USED)}>
            <Text style={[PostStyles.tagType, tagTypeStyles(this.state, RECENTLY_USED)]}>
              {RECENTLY_USED} {this.recentlyUsedTagsCount()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.tagTypePressed(TEXT)}>
            <Text style={[PostStyles.tagType, tagTypeStyles(this.state, TEXT)]}>
              {TEXT} {this.textTagsCount()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={PostStyles.colorTagTypeContainer} onPress={() => this.tagTypePressed(COLOR)}>
            <Text style={[PostStyles.tagType, tagTypeStyles(this.state, COLOR), PostStyles.colorTagType]}>{COLOR}</Text>

            {(this.state.tagColorSelected !== WHITE) &&
              <View style={[PostStyles.currentColorTag, {backgroundColor: this.state.tagColorSelected}]}></View>
            }
          </TouchableOpacity>
        </View>

        {(this.state.viewingTagType === RECENTLY_USED) &&
          <>
            <SafeAreaView style={PostStyles.textTagsContainer}>
              <FlatList
                ref='recentlyUsedTags'
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.state.recentlyUsedTags}
                keyExtractor={item => item.label}
                renderItem={({item}) => {
                    return (
                      <>
                        {!item.added &&
                          <TouchableOpacity style={PostStyles.textTagNotAdded} onPress={() => this.recentlyUsedTagAdded(item)}>
                            <Text style={PostStyles.tagLabelNotAdded}>{item.label}</Text>
                            <Image style={PostStyles.textTagActionIcon} source={require('../assets/plus.png')}/>
                          </TouchableOpacity>
                        }

                        {item.added &&
                          <TouchableOpacity style={PostStyles.textTag} onPress={() => this.recentlyUsedTagRemoved(item)}>
                            <Text style={PostStyles.tagLabel}>{item.label}</Text>
                            <Image style={PostStyles.textTagActionIcon} source={require('../assets/minus.png')}/>
                          </TouchableOpacity>
                        }
                      </>
                    );
                  }
                }
              />
            </SafeAreaView>

            {!this.state.recentlyUsedTags.length &&
              <View style={PostStyles.recentlyUsedTagsPlaceholderContainer}>
                <Text style={PostStyles.recentlyUsedTagsPlaceholder}>{RECENTLY_USED_TAGS_PLACEHOLDER}</Text>
              </View>
            }
          </>
        }

        {(this.state.viewingTagType === TEXT) &&
          <View style={PostStyles.textTagContainer}>
            <View style={PostStyles.textTagInputContainer}>
              <TouchableOpacity onPress={() => this.refs.textTagField.focus()} style={PostStyles.textTagInput}>
                <TextInput
                  ref='textTagField'
                  autoCorrect={false}
                  onSubmitEditing={() => this.textTagAdded()}
                  style={PostStyles.textTagInputValue} 
                  returnKeyType='done' 
                  placeholder={TAG_PLACEHOLDER} 
                  onChangeText={value => this.textTagChanged(value)}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.textTagAdded()}>
                <Image style={PostStyles.addTextTagIcon} source={require('../assets/plus.png')}/>
              </TouchableOpacity>
            </View>

            <SafeAreaView style={PostStyles.textTagsContainer}>
              <FlatList
                ref='textTags'
                onContentSizeChange={()=> this.refs.textTags.scrollToEnd()}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.state.textTags}
                keyExtractor={item => item.toString()}
                renderItem={({item}) => {
                    return (
                      <TouchableOpacity style={PostStyles.textTag} onPress={() => this.textTagRemoved(item)}>
                        <Text style={PostStyles.tagLabel}>{item}</Text>
                        <Image style={PostStyles.textTagActionIcon} source={require('../assets/minus.png')}/>
                      </TouchableOpacity>
                    );
                  }
                }
              />
            </SafeAreaView>
          </View>
        }

        {(this.state.viewingTagType === COLOR) &&
          <View style={PostStyles.tagColorContainer}>
            {TAG_COLORS.map(color => {
                return (
                  <TouchableOpacity 
                    onPress={() => this.tagColorPressed(color)}
                    key={color.toString()}
                    style={[PostStyles.tagColor, tagColorStyles(this.state, color)]}>
                  </TouchableOpacity>
                );
              })}
          </View>
        }

        {this.state.postVisiblitySelected && (!this.props.noPreview || this.state.caption) &&
          <TouchableOpacity
            style={[PostStyles.optionButton, PostStyles.submitButton]}
            onPress={() => null}>
              <Text style={[PostStyles.buttonLabel]}>POST</Text>
          </TouchableOpacity>
        }
      </>
		);
	}
}

function mapStateToProps(state){
  return {
  	...getCurrentPage(),
  	signedIn: state.user.signedIn
  }
}

const mapDispatchToProps = {
  showOverlay
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPost);