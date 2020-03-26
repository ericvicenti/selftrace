import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { t } from 'i18n-js';
import FormContainer from '../../components/FormContainer';
import PageContainer from '../../components/PageContainer';
import Picker from '../../components/Picker';
import Text from '../../components/Text';
import SubmitButton from '../../components/SubmitButton';
import { Wellbeing } from '../../data-types';
import * as Actions from '../../actions/auth/userInfo';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { Main, Colors, Margins, Typography, Paddings } from '../../styles';

const styles = StyleSheet.create({
  topTextContainer: {
    marginTop: Margins.MAX_Y,
    paddingHorizontal: Paddings.MAX_X,
    paddingVertical: Paddings.Y,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.BORDER.toString(),
    maxWidth: Main.FORM_CONTANER_MAX_WIDTH,
  },
  topText: {
    ...Typography.INACTIVE_TEXT_STYLES,
  },
  descriptionText: {
    marginBottom: 5,
  },
  noteSection: {
    marginTop: Margins.MIN_Y,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  noteText: {
    fontSize: 12,
  },
  formContainer: {
    width: '100%',
    marginTop: Margins.Y,
    paddingHorizontal: Paddings.MAX_X,
  },
  textContainer: {
    alignSelf: 'flex-start',
    paddingVertical: Paddings.Y,
    marginBottom: Margins.Y,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.BORDER.toString(),
    maxWidth: Main.FORM_CONTANER_MAX_WIDTH,
  },
  picker: {
    paddingVertical: Paddings.Y,
  },
  title: {
    fontWeight: '900',
    color: Colors.PRIMARY.toString(),
    fontSize: 28,
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

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function FormPage({ currentWellbeing, progress, uploadUserInfo, uid }: Props) {
  const [wellbeing, setWellbeing] = React.useState(currentWellbeing);

  // TODO: Clean up
  const WELLBEING_OPTION_MAP: WellbeingOptionMap = {
    [Wellbeing.FeelingWell]: {
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
    <PageContainer>
      <Text style={styles.title}>{t('headers.form')}</Text>
      <View style={styles.topTextContainer}>
        <Text style={styles.topText}>{t('form.topNote')}</Text>
      </View>
      <FormContainer progress={progress} style={styles.formContainer}>
        <Picker
          label={t('form.wellbeing')}
          selectedValue={wellbeing}
          onValueChange={val => setWellbeing(val ? Number(val) : undefined)}
          items={WELLBEING_OPTIONS}
          style={styles.picker}
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
        progress={progress}
        disabled={submitDisabled}
        onPress={() => {
          uploadUserInfo(uid, { wellbeing: wellbeing!.valueOf() }, currentWellbeing === wellbeing);
        }}
      />
    </PageContainer>
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
