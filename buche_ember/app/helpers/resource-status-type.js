import Ember from 'ember';

const resourceStatuses = {
    n: 'new',
    o: 'ok',
    f: 'fail'
}

export function resourceStatusType([status]) {
    let visibleStatus = status;

    if (resourceStatuses.hasOwnProperty(status)) {
        visibleStatus = resourceStatuses[status];
    }

    return visibleStatus;
}

export default Ember.Helper.helper(resourceStatusType);
