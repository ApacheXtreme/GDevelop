// @flow
import { Trans } from '@lingui/macro';

import * as React from 'react';
import Dialog from '../../UI/Dialog';
import FlatButton from 'material-ui/FlatButton';
import InstructionEditor from './index.js';
import {
  type ResourceSource,
  type ChooseResourceFunction,
} from '../../ResourcesList/ResourceSource.flow';
import { type ResourceExternalEditor } from '../../ResourcesList/ResourceExternalEditor.flow';
import { type EventsScope } from '../EventsScope.flow';

const styles = {
  dialogContent: {
    width: 'calc(100% - 16px)',
    maxWidth: 'none',
  },
  dialogBody: {
    padding: 0,
    display: 'flex',
  },
};

type Props = {|
  project: gdProject,
  scope: EventsScope,
  globalObjectsContainer: gdObjectsContainer,
  objectsContainer: gdObjectsContainer,
  instruction: gdInstruction,
  isCondition: boolean,
  resourceSources: Array<ResourceSource>,
  onChooseResource: ChooseResourceFunction,
  resourceExternalEditors: Array<ResourceExternalEditor>,
  style?: Object,
  isNewInstruction: boolean,
  onCancel: () => void,
  onSubmit: () => void,
  open: boolean,
  openInstructionOrExpression: (
    extension: gdPlatformExtension,
    type: string
  ) => void,
|};
type State = {||};

export default class InstructionEditorDialog extends React.Component<
  Props,
  State
> {
  render() {
    const {
      isNewInstruction,
      onCancel,
      onSubmit,
      open,
      ...otherProps
    } = this.props;
    const actions = [
      <FlatButton
        label={<Trans>Cancel</Trans>}
        primary={false}
        onClick={onCancel}
      />,
      <FlatButton
        label={<Trans>Ok</Trans>}
        primary={true}
        keyboardFocused={false}
        onClick={onSubmit}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        open={open}
        onRequestClose={onCancel}
        contentStyle={styles.dialogContent}
        bodyStyle={styles.dialogBody}
      >
        <InstructionEditor {...otherProps} />
      </Dialog>
    );
  }
}
