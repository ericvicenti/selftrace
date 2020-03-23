import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { t } from 'i18n-js';
import FormContainer from '../../components/FormContainer';
import Picker from '../../components/Picker';
import BottomTab from '../../components/BottomTab';
import Text from '../../components/Text';
import SubmitButton from '../../components/SubmitButton';
import * as Actions from '../../actions/auth/userInfo';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { PRIMARY_COLOR, BORDER_COLOR } from '../../styles/colors';
import { INACTIVE_TEXT_STYLES } from '../../styles/typography';
import { MARGIN_Y, W_MARGIN, MIN_MARGIN_Y } from '../../styles';
import { Wellbeing, ProgressStatus } from '../../data-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  topText: {
    ...INACTIVE_TEXT_STYLES,
  },
  descriptionText: {
    marginBottom: 5,
  },
  noteSection: {
    marginTop: MIN_MARGIN_Y,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  noteText: {
    fontSize: 12,
  },
  textContainer: {
    padding: W_MARGIN,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR.toString(),
  },
  title: {
    fontWeight: '900',
    color: PRIMARY_COLOR.toString(),
    fontSize: 28,
  },
  formContainer: {
    width: '100%',
    marginTop: MARGIN_Y,
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  currentWellbeing: state.auth.userInfo.wellbeing,
  progress: state.auth.userInfo.progress,
  authStatus: state.auth.status,
  uid: state.auth.userInfo.uid,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      uploadUserInfo: Actions.uploadUserInfo,
      clearProgress: () => (d: Dispatch) => d(Actions.clearUpdateUserInfoProgress()),
    },
    dispatch
  );

interface WellbeingObject {
  value: Wellbeing;
  label: string;
  description: string;
  important: string;
  note: string;
}

interface WellbeingOptionMap {
  [key: number]: Omit<WellbeingObject, 'value'>;
}

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  pathname: string;
}

function FormPage({ currentWellbeing, progress, pathname, uploadUserInfo, uid }: Props) {
  const [wellbeing, setWellbeing] = React.useState(currentWellbeing);

  // TODO: Clean up
  const WELLBEING_OPTION_MAP: WellbeingOptionMap = {
    [Wellbeing.NotTested]: {
      label: t('form.options.well.label'),
      description: t('form.options.well.description'),
      important: t('form.options.well.important'),
      note: t('form.options.well.note'),
    },
    [Wellbeing.ShowingSymptoms]: {
      label: t('form.options.symptoms.label'),
      description: t('form.options.symptoms.description'),
      important: t('form.options.symptoms.important'),
      note: t('form.options.symptoms.note'),
    },
    [Wellbeing.TestedNegative]: {
      label: t('form.options.negative.label'),
      description: t('form.options.negative.description'),
      important: t('form.options.negative.important'),
      note: t('form.options.negative.note'),
    },
    [Wellbeing.TestedPositive]: {
      label: t('form.options.positive.label'),
      description: t('form.options.positive.description'),
      important: t('form.options.positive.important'),
      note: t('form.options.positive.note'),
    },
  };

  const WELLBEING_OPTIONS = Object.keys(WELLBEING_OPTION_MAP).map(rawVal => {
    const value: Wellbeing = Number(rawVal);
    return { value, ...WELLBEING_OPTION_MAP[value] };
  });

  const wellbeingObj: Omit<WellbeingObject, 'value'> | undefined = WELLBEING_OPTION_MAP[wellbeing];
  const submitDisabled = !wellbeing;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Form</Text>
        <View style={styles.textContainer}>
          <Text style={styles.topText}>{t('form.topNote')}</Text>
        </View>
        <FormContainer progress={progress}>
          <Picker
            label={t('form.wellbeing')}
            displayValue={wellbeing ? WELLBEING_OPTION_MAP[wellbeing].label : ''}
            selectedValue={wellbeing}
            onValueChange={val => setWellbeing(val)}
            items={WELLBEING_OPTIONS}
          />
          {wellbeingObj && (
            <View style={styles.textContainer}>
              <Text style={styles.descriptionText}>{wellbeingObj.description}</Text>
              {!!wellbeingObj.important && (
                <View style={styles.noteSection}>
                  <Text>
                    <Text style={styles.noteTitle}>{t('form.important')}: </Text>
                    <Text style={styles.noteText}>{wellbeingObj.important}</Text>
                  </Text>
                </View>
              )}
              {!!wellbeingObj.note && (
                <View style={styles.noteSection}>
                  <Text>
                    <Text style={styles.noteTitle}>{t('form.note')}: </Text>
                    <Text style={styles.noteText}>{wellbeingObj.note}</Text>
                  </Text>
                </View>
              )}
            </View>
          )}
        </FormContainer>
        <SubmitButton
          label={t('buttons.update')}
          onPress={() => {
            uploadUserInfo(
              uid,
              { wellbeing: wellbeing!.valueOf() },
              currentWellbeing === wellbeing
            );
          }}
          disabled={submitDisabled}
          loading={progress.status === ProgressStatus.REQUEST}
        />
      </View>
      <BottomTab pathname={pathname} />
    </>
  );
}

FormPage.getInitialProps = async (ctx: NextPageContext) => {
  // do async stuff here to load data
  // ctx.query is the ?params
  // eg:
  // let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  // let response = await fetch(url);
  // let result = await response.json();

  return {
    // data: result,
    // query: ctx.query,
    pathname: ctx.pathname,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
