import * as React from 'react';
import renderer from 'react-test-renderer';

import {TaskCard}  from '../../components/TaskCard/';

test(`TaskCard Snapshot`, () => {
    const snap = renderer.create(
        <TaskCard />
    ).toJSON();
    expect(snap).toMatchSnapshot();
});
