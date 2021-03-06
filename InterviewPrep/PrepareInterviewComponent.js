import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import colors from '../assets/colors';
import InterviewPrepIntro from './Intro';
import InterviewPrepContainer from './Container';
import Modal from '../views/Modal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { strings } from '../locales/i18n';

class PrepareInterviewComponent extends Component {
  constructor() {
    super();
    this.state = {
      modalOn: false,
    };
  }

  handleModalClose = () => {
    this.setState({
      modalOn: false,
    });
  };

  render() {
    const {pageIndex} = this.props.prepData;
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalOn}
          handleModalClose={this.handleModalClose}
          title={strings('contact.header_text_demo')}>
          {
            {
              0: <InterviewPrepIntro />,
              1: <InterviewPrepContainer
                  handleModalClose={this.handleModalClose}
                />,
            }[pageIndex]
          }
        </Modal>
        <View style={styles.header}>
          <Image
            style={styles.clipboard}
            source={require('../assets/health/clipboard.png')}
          />
          <Text style={styles.title}>
            {strings('prepare.for_contact_tracer_interview')}
          </Text>
        </View>
        <Text style={styles.description}>
          {strings('prepare.for_contact_tracer_description_text')}
        </Text>
        <View style={styles.button_group}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                modalOn: true,
              });
            }}>
            <Text style={styles.button_text}>{strings('prepare.for_interview_btn_text')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.learn_more]}
            onPress={() => {

            }}>
            <Text style={[styles.button_text, styles.learn_more_text]}>{strings('learn.more_link_text')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clipboard: {
    width: 60,
    height: 70,
  },
  title: {
    fontSize: 16,
    lineHeight: 23,
    textTransform: 'capitalize',
    color: colors.module_title,
    paddingLeft: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.body_copy,
    marginVertical: 15,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.primary_theme,
    paddingVertical: 15,
    alignItems: 'center',
  },
  button_text: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: 'white',
    textTransform: 'uppercase',
  },
  learn_more: {
    backgroundColor: colors.card_border,
  },
  learn_more_text: {
    color: colors.section_title,
  },
});

InterviewPrepIntro.propTypes = {
  updatePageIndex: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    prepData: state.interviewPrepReducer,
  };
};

export default connect(mapStateToProps)(PrepareInterviewComponent);
