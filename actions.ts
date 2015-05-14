/**
 * Created by rado on 5/13/15.
 */

/// <reference path="typings/rx/rx.d.ts" />
import {Subject} from 'rx';

export var textUpdate = new Subject();
export var statusUpdate = new Subject();