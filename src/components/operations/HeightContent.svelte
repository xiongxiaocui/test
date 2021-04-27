<script lang="ts">
  import Input from '../../UI/TextInput.svelte'
  import PopOver from '../../UI/PopOver.svelte';
  import SingleSelect from '../../UI/SingleSelect.svelte'
  import conditions from './condition-store'
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()
  export let headings

  let btnRef: HTMLButtonElement
  let showPopOver: Boolean
  let search: String
  let searchAlgrom: String
  let optionIndex: Number
  let changedProperty
  let changedValue
  const changeInputHandler = (option, value) => {
    changedValue = value
    dispatch('filter-table', {
      value: value,
      option: option,
      key: changedProperty
    })
  }

  function togglePopOver() {
    if (showPopOver) {
      showPopOver = false
    } else {
      showPopOver = true
    }
  }
  const searchHandler = e => {
    search = e.detail.value
  }
  
  const searchAlgromHandler = e => {
    searchAlgrom = e.detail.value
  }
  // todo: 选中头部的后续操作
  const handleSelectedKey = e => {
    const { detail } = e
    const {property} = detail
    changedProperty = property
    dispatch('filter-table', {
      value: changedValue,
      key: changedProperty
    })
  }
  // todo: 选中算法之后的后续操作
  const handleSelectedAlgrom = e =>{
    const { detail } = e
    const { algorithm } = detail
    if (algorithm.indexOf("empty") >= 0) {
      const option = $conditions[+optionIndex]
      const { id } = option
      const newCondition = {...option, showInput: false}
      conditions.updateCondition(id, newCondition)
    } else {
      const option = $conditions[+optionIndex]
      const { id } = option
      const newCondition = {...option, showInput: true}
      conditions.updateCondition(id, newCondition)
    }
  }

  // todo: 获取选择的options的index
  const handleSelectedIndex = (i) => {
    optionIndex = i
  }

  // todo 增加筛选条件
  const handleAddNewCondition = () => {
    const length = $conditions.length || 0
    const item = {
      id: length,
      showInput: true,
      key: "",
      algrom: ''
    }
    conditions.addConditions(item)
  }

  // todo 删除筛选条件
  const handleDeleteItem = (item) => {
    const { id } = item
    conditions.removeCondition(id)
  }


  const searchOptions = [{
    title: '等于',
    algorithm: '='
  }, {
    title: '不等于',
    algorithm: '!='
  }, {
    title: '包含',
    algorithm: 'contains'
  }, {
    title: '不包含',
    algorithm: '!contains'
  }, {
    title: '为空',
    algorithm: 'empty'
  }, {
    title: '不为空',
    algorithm: '!empty'
  }]

  $:filterOptions = headings.filter(item => {
    const curTitle = item && item.title && item.title.toLowerCase()
    const curSearch = search && search.toLowerCase()
    if (!curSearch) {
      return {...headings}
    }
    return curTitle.startsWith(curSearch)
  })

  $:filterSearchOptions = searchOptions.filter(item => {
    const curTitle = item && item.title && item.title.toLowerCase()
    const curSearch = searchAlgrom && searchAlgrom.toLowerCase()
    if (!curSearch) {
      return {...searchOptions}
    }
    return curTitle.startsWith(curSearch)
  })
</script>
  <PopOver width={"600px"}>
    <button
      slot="button"
      id="filterOperation"
      type="button"
      on:click="{togglePopOver}"
      class="btn"><span
        class="btn-icon">
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="#636363"
          class=""><path
            d="M5.9 5.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.2 2.3c-.4-.4-1-.4-1.4 0L1.7 4.4c-.4.4-.4 1 0 1.4s1 .4 1.4 0l.4-.4v5.2l-.4-.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.1 2.1c.2.2.4.3.7.3s.5-.1.7-.3l2.1-2.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-.4.4V5.4l.4.4zM10 5h4c.6 0 1-.4 1-1s-.4-1-1-1h-4c-.6 0-1 .4-1 1s.4 1 1 1zm4 2h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1zm0 4h-4c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1z" /></svg>
      </span><span>行高</span></button>
      <div slot="content">
        {#if showPopOver}
        <div class="viewFilter" >
            {#each $conditions as condition,i (i)}
            <div class="condition">
              <div class="conditionItem">
              <div class="junction" style="padding-left: 10px;">
                当
              </div>
              <div class='field' style="width: max-content;">
                <SingleSelect options={filterOptions} on:search="{searchHandler}" on:selected="{handleSelectedKey}" width={"128px"} showFirst></SingleSelect>
              </div>
              <div style="width: max-content;margin-right:10px;">
                <SingleSelect options={filterSearchOptions} on:search="{searchAlgromHandler}" on:selected="{handleSelectedAlgrom}" on:addParams="{handleSelectedIndex.bind(this, i)}" width={"128px"} showFirst></SingleSelect>
              </div>
              {#if condition.showInput}
                <div class="filterValue">
                  <div class="inputContainer">
                    <Input onChange={changeInputHandler.bind(this, condition)} height="100%" />
                  </div>
                </div><!-- content here -->
              {/if}
              <button on:click="{handleDeleteItem.bind(this, condition)}" type="button" class="btn" style="color: rgb(201, 201, 201);">
                <span class="btn-icon">
                  <svg viewbox="0 0 16 16" width="15" height="15" fill="#C9C9C9">
                    <path d="M14 4h-3V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v1H2c-.6 0-1 .4-1 1s.4 1 1 1h1v6c0 1.7 1.3 3 3 3h4c1.7 0 3-1.3 3-3V6h1c.6 0 1-.4 1-1s-.4-1-1-1zM7 3h2v1H7V3zm4 9c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V6h6v6z"></path>
                  </svg>
                </span></button>
              </div>
            </div>
            {/each}
            <div class="addNewButton" on:click='{handleAddNewCondition}'>
              <div class="iconAdd">
              <svg viewbox="0 0 16 16" width="16" height="16" fill="#8C8C8C">
                <path d="M12.3 7.2H8.8V3.6c0-.4-.3-.8-.8-.8s-.8.4-.8.8v3.6H3.5c-.4 0-.8.4-.8.8s.3.8.8.8h3.8v3.7c0 .4.3.8.8.8s.8-.3.8-.8V8.8h3.5c.3 0 .6-.4.6-.8s-.3-.8-.7-.8z"></path>
              </svg>
              </div>添加筛选条件
            </div>
            </div>
        {/if}
    </div>
</PopOver>

<style>
.condition {
  padding-top: 2px;
  max-height: 500px;
  overflow-y: auto;
}
.viewFilter {
  width: 600px;
  padding: 24px;
  box-sizing: border-box;
  z-index: 10;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.addNewButton {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
.conditionItem {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-bottom: 16px;
}
.junction {
  width: 64px;
  height: 40px;
  line-height: 40px!important;
  margin-right: 24px!important;
  background: #f2f4f6;
  border-radius: 4px;
  justify-content: flex-start;
  display: flex!important;
}
.field {
  width: 128px;
  margin-right: 8px!important;
  background: #f2f4f6;
}

.filterValue{
    flex: 1 1;
    width: 0;
    height: 40px;
    margin-right: 8px;
}
.inputContainer {
  height: 100%;
}

</style>