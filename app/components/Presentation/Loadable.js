/**
 *
 * Asynchronously loads the component for Presentation
 *
 */

import loadable from '@loadable/component';

export default loadable(() => import('./index'));
