import { toKebabCase } from '../utils/string.js';
import { Entry } from '../../types/Entry.js';
import { Visibility } from '../lib/Enum.js';
import { AbstractDecorativeEntry } from './AbstractDecorativeEntry.js';

export class ModelEntry extends AbstractDecorativeEntry<'model'> implements Entry.ModelEntry {
  name: string;
  prop: string;
  event: string;
  category?: string | undefined;
  version?: string | undefined;
  visibility: Entry.Visibility = Visibility.public;

  /**
   * By default:
   * - Vue 3: v-model on a component uses `modelValue` as the prop and `update:modelValue` as the event
   * - Vue 2: v-model on a component uses `value` as the prop and `input` as the event
   */
  constructor(propNameInCamelCase = 'value', event = 'input') {
    super('model');

    this.name = propNameInCamelCase;
    this.prop = toKebabCase(propNameInCamelCase, [':']);
    this.event = event;
  }
}
