import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const importAll = (requireContext) =>
  requireContext.keys().forEach(requireContext)

importAll(require.context('./svg', true, /\.svg$/))
