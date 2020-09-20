const ProgressIndicator = {

    show(time = 6000) {
        // <div class="progress-indicator">
        //     <div class="indeterminate"></div>
        // </div>

        const progress = document.createElement('div')
        progress.className = 'progress-indicator'
        progress.id = 'progress-indicator'

        const indeterminate = document.createElement('div')
        indeterminate.className = 'indeterminate'

        progress.appendChild(indeterminate)

        document.getElementById('app').appendChild(progress)
    },

    hide() {
        const progress = document.getElementById('progress-indicator')

        if (progress)
            progress.remove()
    }

}

export default ProgressIndicator