/**
 *
 * Asynchronously loads the component for PulseLoader
 *
 */

import loadable from '@loadable/component';

export default loadable(() => import('./index'));
