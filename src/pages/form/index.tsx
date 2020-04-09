import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { t } from 'i18n-js';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormContainer from '../../components/FormContainer';
import PageContainer from '../../components/PageContainer';
import Picker from '../../components/Picker';
import Text from '../../components/Text';
import SubmitButton from '../../components/SubmitButton';
import { Wellbeing, CovidSymptom } from '../../data-types';
import ObjectUtils from '../../util/ObjectUtils';
import * as Actions from '../../actions/auth/userInfo';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import { Colors, Margins, Typography, Paddings } from '../../styles';

const CONTENT_MAX_WIDTH = 640;

const styles = StyleSheet.create({
  formQuestionContainer: {
    alignSelf: 'flex-start',
    marginBottom: Margins.MIN_Y,
    paddingVertical: Paddings.MAX_Y,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.BORDER.toString(),
  },
  formQuestion: {
    ...Typography.INACTIVE_TEXT_STYLES,
  },
  descriptionText: {
    marginBottom: 5,
  },
  noteSection: {
    marginTop: Margins.MIN_Y,
  },
  noteTitle: {
    fontWeight: '700',
  },
  noteText: {},
  formContainer: {
    width: '100%',
    marginTop: Margins.Y,
    paddingHorizontal: Paddings.MAX_X + Paddings.MIN_X,
    paddingVertical: Paddings.MAX_Y,
    maxWidth: CONTENT_MAX_WIDTH,
  },
  textContainer: {
    alignSelf: 'flex-start',
    paddingVertical: Paddings.Y,
    marginBottom: Margins.Y,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.BORDER.toString(),
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
  currentSymptomMap: state.auth.userInfo.symptomMap,
  progress: state.auth.userInfo.progress,
  uid: state.auth.userInfo.uid!,
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

const WELLBEING_OPTION_MAP: { [key: string]: Omit<WellbeingObject, 'value'> } = {};

for (const wb in Wellbeing) {
  if (!isNaN(Number(wb))) {
    WELLBEING_OPTION_MAP[wb] = {
      label: t(`screens.form.sections.wellbeing.options.${wb}.label`),
      description: t(`screens.form.sections.wellbeing.options.${wb}.description`),
      important: t(`screens.form.sections.wellbeing.options.${wb}.important`),
      note: t(`screens.form.sections.wellbeing.options.${wb}.note`),
    };
  }
}

interface SymptomObject {
  value: Wellbeing;
  label: string;
}

const SYMPTOM_OPTION_MAP: { [key: string]: Omit<SymptomObject, 'value'> } = {};

for (const smp in CovidSymptom) {
  if (!isNaN(Number(smp))) {
    SYMPTOM_OPTION_MAP[smp] = {
      label: t(`screens.form.sections.symptoms.options.${smp}.label`),
    };
  }
}

interface BoolMap {
  [key: string]: boolean;
}

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function FormPage({ currentWellbeing, currentSymptomMap, progress, uploadUserInfo, uid }: Props) {
  const [wellbeing, setWellbeing] = React.useState(currentWellbeing);
  const [symptomMap, setSymptomMap] = React.useState(currentSymptomMap);

  const WELLBEING_OPTIONS = Object.keys(WELLBEING_OPTION_MAP).map(rawVal => {
    const value: Wellbeing = Number(rawVal);
    return { value, ...WELLBEING_OPTION_MAP[value] };
  });

  const SYMPTOM_OPTIONS = Object.keys(SYMPTOM_OPTION_MAP).map(rawVal => {
    const value: CovidSymptom = Number(rawVal);
    return { value, ...SYMPTOM_OPTION_MAP[value] };
  });

  const wellbeingObj: Omit<WellbeingObject, 'value'> | undefined = wellbeing
    ? WELLBEING_OPTION_MAP[wellbeing]
    : undefined;
  const submitDisabled =
    !wellbeing || (wellbeing === Wellbeing.ShowingSymptoms && ObjectUtils.isEmpty(symptomMap));

  function handleSymptomMapChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSymptomMap(prev => {
      const { name: symptomKey, checked: newVal } = event.target;
      const newSymptoms = { ...prev };
      if (newVal) {
        newSymptoms[symptomKey] = true;
      } else {
        delete newSymptoms[symptomKey];
      }

      return newSymptoms;
    });
  }

  function handleSubmit() {
    const hasSymptomMapChanged = ObjectUtils.areShallowEqual(currentSymptomMap, symptomMap);
    const haveDetailsChanged =
      currentWellbeing !== wellbeing ||
      (wellbeing === Wellbeing.ShowingSymptoms && hasSymptomMapChanged);
    uploadUserInfo(
      uid,
      {
        wellbeing: wellbeing!.valueOf(),
        symptomMap: wellbeing === Wellbeing.ShowingSymptoms ? symptomMap : {},
      },
      haveDetailsChanged
    );
  }

  return (
    <PageContainer isProtected>
      <Text style={styles.title}>{t('headers.form')}</Text>
      <FormContainer progress={progress} style={styles.formContainer}>
        <View style={styles.formQuestionContainer}>
          <Text style={styles.formQuestion}>{t('screens.form.sections.wellbeing.question')}</Text>
        </View>
        <Picker
          label={t('screens.form.wellbeing')}
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
                  <Text style={styles.noteTitle}>{t('screens.form.important')}: </Text>
                  <Text style={styles.noteText}>{wellbeingObj.important}</Text>
                </Text>
              </View>
            )}
            {!!wellbeingObj.note && (
              <View style={styles.noteSection}>
                <Text>
                  <Text style={styles.noteTitle}>{t('screens.form.note')}: </Text>
                  <Text style={styles.noteText}>{wellbeingObj.note}</Text>
                </Text>
              </View>
            )}
          </View>
        )}
        {wellbeing === Wellbeing.ShowingSymptoms && (
          <>
            <View style={styles.formQuestionContainer}>
              <Text style={styles.formQuestion}>
                {t('screens.form.sections.symptoms.question')}
              </Text>
            </View>
            <FormControl color="primary">
              <FormGroup
                style={{
                  flexDirection: 'row',
                }}>
                {SYMPTOM_OPTIONS.map(item => (
                  <FormControlLabel
                    key={item.value.toString()}
                    control={
                      <Checkbox
                        checked={symptomMap[item.value]}
                        onChange={handleSymptomMapChange}
                        name={item.value.toString()}
                        color="primary"
                      />
                    }
                    label={item.label}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </>
        )}
      </FormContainer>
      <SubmitButton
        label={t('buttons.update')}
        progress={progress}
        disabled={submitDisabled}
        onPress={handleSubmit}
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
