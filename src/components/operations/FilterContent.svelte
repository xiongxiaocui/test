<script lang="ts">
  import Input from './../../UI/TextInput.svelte'
  import PopOver from './../../UI/PopOver.svelte';
  import SingleSelect from './../../UI/SingleSelect.svelte'
  import conditions from './condition-store'
  export let headings

  let btnRef: HTMLButtonElement
  let showPopOver: Boolean
  let popOverId: String
  let search: String
  let searchAlgrom: String
  let optionIndex: Number
  const changeInputHandler = (value) => {
    // console.log(value)
  }

  function togglePopOver() {
    if (showPopOver) {
      showPopOver = false
    } else {
      showPopOver = true
      popOverId = btnRef && btnRef.id
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
    // console.log(e)
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
      showInput: true
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
<button
    bind:this={btnRef}
    id="filterOperation"
    type="button"
    on:click="{togglePopOver}"
    class="btn"><span
      class="btn-icon"><svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="#636363"
        class=""><path
          d="M12.7 3H3.3C2.4 3 2 4 2.6 4.7L6.5 9c.2.2.3.4.3.7v3.1c0 .2.1.3.2.4l1.5 1.1c.3.2.8 0 .8-.4V9.6c0-.3.1-.5.3-.7l3.9-4.3c.5-.6.1-1.6-.8-1.6z" /></svg></span><span>筛选</span></button>
{#if showPopOver}
  <PopOver popId={popOverId} width={"600px"}>
    <div class="viewFilter" slot="content">
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
                <Input onChange={changeInputHandler} height="100%" />
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
</PopOver>
{/if}

<style>

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
.condition {
  padding-top: 2px;
  max-height: 500px;
  overflow-y: auto;
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