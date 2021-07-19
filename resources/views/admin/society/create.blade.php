@extends('admin.app')

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <form method="post" action="{{ route('admin.society.store') }}" enctype="multipart/form-data">
                    {{ @csrf_field() }}
                    <div class="card-title">Society Setting</div>
                    <div class="form-group row">
                        <div class="col-lg-3">Society Name</div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" name="name" value="{{old('name')}}">
                            @if ($errors->has('name') )
                            <span style="color:red">
                                {{ $errors->first('name') }}
                            </span>
                            @endif

                        </div> 
                    </div>
                    <div class="form-group row">
                        <div class="col-lg-3">Society Description</div>
                        <div class="col-lg-8">
                            <textarea name="description" class="form-control">{{ old('description') }}</textarea>
                            @if ($errors->has('description') )
                            <span style="color:red">
                                {{ $errors->first('description') }}
                            </span>
                            @endif
                            <p><small>Total 1000 words</small></p>
                        </div> 
                    </div>

                    <div class="form-group row">
                        <div class="col-lg-3">Upload Logo</div>
                        <div class="col-lg-8">
                            <input type="file" name="logo" />
                            @if ($errors->has('logo') )
                            <span style="color:red">
                                {{ $errors->first('logo') }}
                            </span>
                            @endif
                            <p><small>Supported format: JPG, JPEG, PNG</small></p>
                        </div> 
                    </div>
                    <input class="btn btn-primary" type="submit" value="Upload">
                    
                </form>
                
            </div>
        </div>
    </div>    
</div>
<script>
$(function() {
    var rowIndex=0;
    // Remove button click
    $(document).on(
        'click',
        '[data-role="dynamic-fields"] > .form-inline [data-role="remove"]',
        function(e) {
            rowIndex--;
            e.preventDefault();
            $(this).closest('.form-inline').remove();
        }
    );
    // Add button click
    $(document).on(
        'click',
        '[data-role="dynamic-fields"] > .form-inline [data-role="add"]',
        function(e) {
            e.preventDefault();
            rowIndex++;
            var container = $(this).closest('[data-role="dynamic-fields"]');
            new_field_group = container.children().filter('.form-inline:first-child').clone();
            // new_field_group.find('.team').attr({name:'team_member[]'});
            new_field_group.find('input').each(function(){
                $(this).val('');
            });
            
            container.append(new_field_group);
        }
    );
});
</script>			
@endsection
