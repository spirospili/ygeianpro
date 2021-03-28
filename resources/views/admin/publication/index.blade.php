@extends('admin.app')

@section('content')
 
<div class="row mb-4">
    <div class="col-sm-12">
        <form method="GET">
            <input type="hidden" name="action" value="{{request()->action}}" />
            <div class="input-group">
                <input type="text" class="input-sm form-control" name="keywords" placeholder="Search" value="{{ request()->keywords }}">
                <span class="input-group-btn">
                    <input class="btn btn btn-primary" type="submit" value="Go!">
                </span>
            </div>
        </form>
    </div>
</div>
<div class="row">
    <div class="col-md-12 text-right mb-4">
        <a href="{{ route('admin.publication.create') }}" class="btn btn-primary">Create Publication</a>
    </div>
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
            <div class="table-responsive">
                @if($publications->isNotEmpty())
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>File</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($publications as $publication)
                        <tr>
                            <td>{{$publication->id}}</td>
                            <td>{{ $publication->name }}</td>
                            <td>{{ $publication->path }}</td>
                            <td>
                                <a href="{{ route('admin.publication.edit', $publication->id) }}">
                                    Edit
                                </a>
                                |
                                <a  href="{{ route('admin.publication.destroy', $publication->id) }}"
                                    onclick="event.preventDefault();
                                        document.getElementById('destroy-form{{$publication->id}}').submit();">
                                    Delete
                                </a>

                                <form id="destroy-form{{$publication->id}}" action="{{ route('admin.publication.destroy', $publication->id) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    <input type="hidden" name="_method" value="DELETE" /> 
                                </form>
                            </td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                    @else
                    <p class="text-center">No Publications</p>
                    @endif
                  </div>
            </div>
        </div>
    </div>    
</div>
					
@endsection